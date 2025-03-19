import {Component, inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpService} from '../http.service';
import {ReservationService} from '../reservation.service';
import {ReservationDTO, Room} from '../interfaces';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-room-reservation',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './room-reservation.component.html',
  styleUrl: './room-reservation.component.css'
})
export class RoomReservationComponent {
  times: string[] = [
    '7:00', '8:00', '8:55', '10:00', '10:55', '11:50', '12:45',
    '13:40', '14:35', '15:30', '16:25', '17:20', '18:15', '19:10'
  ];
  httpService: HttpService = inject(HttpService);
  router = inject(Router)
  storageService: LocalStorageService = inject(LocalStorageService);
  private snackBar = inject(MatSnackBar);

  currentWeekStart: Date;
  weekDays: Date[] = [];
  weekDaysFormatted: string[] = [];

  rooms: Room[] = []; // Example rooms
  currentRoom?: Room = undefined;

  // Track selected cells
  selectedCells: { [key: string]: string } = {}; // Key: "rowIndex-columnIndex", Value: color

  // Track drag selection state
  isDragging: boolean = false;
  startCell: { rowIndex: number, colIndex: number } | null = null;
  endCell: { rowIndex: number, colIndex: number } | null = null;

  // Available colors for selection
  colors: string[] = ['#ffcccc', '#ccffcc', '#ccccff', '#ffffcc']; // Example colors
  count: number = 0;


  reservationService: ReservationService = inject(ReservationService);


  constructor() {
    // Initialize with the current week
    this.currentWeekStart = this.getStartOfWeek(new Date());
    this.renderCalendar();
    this.selectedDays.push(new Date().getDate());
    this.updateWeekDays();

    this.httpService.getAllRooms().subscribe(r => {
        this.rooms = r
        this.currentRoom = this.rooms[0]
      }
    )


  }

  setRoom(room: Room) {
    this.currentRoom = room;
  }


  // Helper function to get the start of the week (Monday)
  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when Sunday
    return new Date(date.setDate(diff));
  }

  // Update the week days based on the current week start
  updateWeekDays(): void {
    this.weekDays = [];
    this.weekDaysFormatted = [];
    let startWeek = 0;
    if (this.count !== 0) {
      startWeek = 1

    }
    this.count++
    for (let i = 0; i < 5; i++) { // Only weekdays (Monday to Friday)
      const day = new Date(this.currentWeekStart);
      day.setDate(day.getDate() + i + startWeek);
      this.weekDays.push(day);
      this.weekDaysFormatted.push(this.formatDate(day));
    }
  }

  // Format date as "Day YYYY.MM.DD"
  formatDate(date: Date): string {
    const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
    const dayName = days[date.getDay() - 1]; // Adjust for Monday as the first day
    return `${dayName} ${date.toISOString().slice(0, 10).replace(/-/g, '.')}`;
  }

  // Handle date selection from the small calendar
  onDateSelect(selectedDate: Date): void {
    this.currentWeekStart = this.getStartOfWeek(selectedDate);
    this.updateWeekDays();
  }

  onMouseDown(rowIndex: number, colIndex: number, event: MouseEvent): void {
    // Record the starting cell for potential drag
    this.isDragging = true;
    this.startCell = { rowIndex, colIndex };
    this.endCell = { rowIndex, colIndex };

    // Set selectedDate and selectedTime when the drag starts
    this.selectedDate = this.weekDays[colIndex]; // Date from column header
    this.selectedTime = this.times[rowIndex];   // Time from row index
  }


  onMouseMove(rowIndex: number, colIndex: number): void {
    if (this.isDragging) {
      // Only update the end cell during drag, don't do selection yet
      this.endCell = { rowIndex, colIndex };
    }
  }


  onMouseUp(event: MouseEvent): void {
    if (this.isDragging) {
      // Check if this was a drag or just a click
      const isDragOperation = this.startCell && this.endCell &&
        (this.startCell.rowIndex !== this.endCell.rowIndex ||
          this.startCell.colIndex !== this.endCell.colIndex);

      if (isDragOperation) {
        // This was a drag selection
        this.selectCellsInRange();
      } else {
        // This was a single click - handle toggle here
        const rowIndex = this.startCell?.rowIndex;
        const colIndex = this.startCell?.colIndex;
        if (rowIndex !== undefined && colIndex !== undefined) {
          this.toggleCell(rowIndex, colIndex);
        }
      }

      // Reset drag state
      this.isDragging = false;
      this.startCell = null;
      this.endCell = null;
    }
  }


// New helper function to toggle a single cell
  toggleCell(rowIndex: number, colIndex: number): void {
    const key = `${rowIndex}-${colIndex}`;
    if (this.selectedCells[key]) {
      // If the cell is already selected, remove the selection
      delete this.selectedCells[key];
    } else {
      // Assign a color to the selected cell
      const colorIndex = Object.keys(this.selectedCells).length % this.colors.length;
      this.selectedCells[key] = this.colors[colorIndex];
    }
  }

// Select all cells within the current drag range
  selectCellsInRange(): void {
    if (!this.startCell || !this.endCell) return;

    const minRow = Math.min(this.startCell.rowIndex, this.endCell.rowIndex);
    const maxRow = Math.max(this.startCell.rowIndex, this.endCell.rowIndex);
    const minCol = Math.min(this.startCell.colIndex, this.endCell.colIndex);
    const maxCol = Math.max(this.startCell.colIndex, this.endCell.colIndex);

    // Check if at least one cell in range is already selected
    let hasSelectedCell = false;
    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        const key = `${row}-${col}`;
        if (this.selectedCells[key]) {
          hasSelectedCell = true;
          break;
        }
      }
      if (hasSelectedCell) break;
    }

    // If at least one cell is selected, delete all cells in the range
    if (hasSelectedCell) {
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const key = `${row}-${col}`;
          delete this.selectedCells[key];
        }
      }
    } else {
      // Otherwise, select all cells with the same color
      const colorIndex = Object.keys(this.selectedCells).length % this.colors.length;
      const selectionColor = this.colors[colorIndex];

      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const key = `${row}-${col}`;
          this.selectedCells[key] = selectionColor;
        }
      }
    }
  }

  // Get the color for a specific cell
  getCellColor(rowIndex: number, colIndex: number): string {
    const key = `${rowIndex}-${colIndex}`;
    return this.selectedCells[key] || '';
  }

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  currentDate = new Date();
  selectedDays: number[] = [];
  days: { label: number | null; isWeekend: boolean; disabled: boolean; date: number }[] = [];

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const blanks = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday-starting week
    this.days = [];

    // Add blanks for the start of the week
    for (let i = 0; i < blanks; i++) {
      this.days.push({ label: null, isWeekend: false, disabled: true, date: 0 });
    }

    // Add actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = new Date(year, month, i).getDay();
      this.days.push({
        label: i,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        disabled: false,
        date: i,
      });
    }
  }

  get monthYear(): string {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    return `${this.months[month]} ${year}`;
  }

  changeMonth(offset: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + offset);
    this.renderCalendar();
    this.selectedDays = []; // Reset selected days when changing months
  }

  selectDay(day: number | null) {
    if (day === null) {
     return;
    }

    if (this.selectedDays.includes(day)) {
      // Deselect the day
      this.selectedDays = this.selectedDays.filter((d) => d !== day);
    } else {
      // Add the day if less than 2 are selected
      if (this.selectedDays.length < 1) {
        this.selectedDays.push(day);
      } else {
        // Replace the earliest selected day if 2 are already selected
        this.selectedDays.shift();
        this.selectedDays.push(day);
      }
    }

    if (this.selectedDays.length > 0) {
      // Get the selected date from the current month and year
      const selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
      this.onDateSelect(selectedDate);
    }
  }

  isInRange(day: number | null): boolean {
    if (day === null) return false;
    if (this.selectedDays.length === 2) {
      const [start, end] = [Math.min(...this.selectedDays), Math.max(...this.selectedDays)];
      return day > start && day < end;
    }
    return false;
  }

  selectedDate: Date | null = null;
  selectedTime: string | null = null;

  onCellClick(rowIndex: number, colIndex: number): void {
    console.log("hey")
    // Set the selectedDate from the table header (weekDays[colIndex])
    this.selectedDate = this.weekDays[colIndex]; // Get the date from the table header
    this.selectedTime = this.times[rowIndex];   // Get the time from the row
  }


  addReservation() {
    if (!this.selectedDate || !this.selectedTime) {
      alert("Please select a time slot in the calendar.");
      return;
    }

    let startTime, endTime;

    // If there's a range selected (dragging), use the first and last times
    if (this.startCell && this.endCell) {
      // The first time is from the start cell
      const firstTime = this.times[this.startCell.rowIndex];
      const [startHour, startMinute] = firstTime.split(':').map(Number);
      startTime = new Date(this.selectedDate);
      startTime.setHours(startHour, startMinute, 0, 0); // Set to the start time

      // The last time is from the end cell
      const lastTime = this.times[this.endCell.rowIndex];
      const [endHour, endMinute] = lastTime.split(':').map(Number);
      endTime = new Date(this.selectedDate);
      endTime.setHours(endHour, endMinute, 0, 0); // Set to the end time
    } else {
      // If only one time is selected, use that as both start and end
      const [hours, minutes] = this.selectedTime.split(':').map(Number);
      startTime = new Date(this.selectedDate);
      startTime.setHours(hours, minutes, 0, 0); // Apply the selected time to the date

      // End time is one hour after the start time by default
      endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1); // Example: 1-hour reservation
    }

    const reservationDTO: ReservationDTO = {
      roomId: this.currentRoom!.id, // Replace with actual selected room
      personId: 1, // Replace with actual user ID
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      reservationDate: startTime.toISOString().split('T')[0], // YYYY-MM-DD format
    };

    this.storageService.addRoomDTO(reservationDTO);



    this.snackBar.open('Hinzugefügt', 'Schließen')
    setTimeout(() => {
      this.snackBar.dismiss()
    } ,2500)

    this.router.navigate(['cart']);
  }


}
