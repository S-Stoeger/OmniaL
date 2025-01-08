import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {CardRowComponent} from '../card-row/card-row.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {EquipmentService} from '../equipment.service';
import {Equipment} from '../equipment';
import {NgForOf, NgIf} from '@angular/common';
import {CurrentRentalService} from '../current-rental.service';
import {RentalEquipment} from '../rental-equipment';
import {RentalComponent} from '../rental/rental.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-shop-detail',
  imports: [
    CardRowComponent,
    NgForOf,
    FormsModule,
  ],
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.css'
})
export class ShopDetailComponent {
  equipment: Equipment | undefined;
  equipmentService: EquipmentService = inject(EquipmentService)
  currentRentalService: CurrentRentalService = inject(CurrentRentalService)
  counter = -1
  @ViewChild('countAmountInput') countAmountInput!: ElementRef;

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

  constructor(private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.equipment = this.equipmentService.getEquipmentById(this.route.snapshot.params['id'])
    this.renderCalendar();
  }


  currentDate = new Date();
  selectedDays: number[] = [];
  days: { label: number | null; isWeekend: boolean; disabled: boolean; date: number }[] = [];
  countAmount = 0;

  get monthYear(): string {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    return `${this.months[month]} ${year}`;
  }

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

  changeMonth(offset: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + offset);
    this.renderCalendar();
    this.selectedDays = []; // Reset selected days when changing months
  }

  selectDay(day: number | null) {
    if (day === null) return;

    if (this.selectedDays.includes(day)) {
      // Deselect the day
      this.selectedDays = this.selectedDays.filter((d) => d !== day);
    } else {
      // Add the day if less than 2 are selected
      if (this.selectedDays.length < 2) {
        this.selectedDays.push(day);
      } else {
        // Replace the earliest selected day if 2 are already selected
        this.selectedDays.shift();
        this.selectedDays.push(day);
      }
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

  addToCart() {
    this.currentRentalService.addEquipment(this.createRentalEquipment(this.equipment!))
    alert("Dein Equipment wurde in den Warenkorb gelegt!")
  }

  createRentalEquipment(equipment: Equipment): RentalEquipment {
    // Ensure selectedDays are sorted (start time is the earliest, end time is the latest)
    const sortedDays = this.selectedDays.sort((a, b) => a - b);
    console.log(sortedDays);

    // Construct startTime and endTime based on the selected days and the current month/year
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const startTime = sortedDays.length > 0 ? new Date(year, month, sortedDays[0]) : null;
    const endTime = sortedDays.length > 1 ? new Date(year, month, sortedDays[1]) : null;

    return {
      id: (this.counter += 1),
      equipmentID: equipment.id,
      count: parseInt(this.countAmountInput.nativeElement.value, 10),
      startTime: startTime ? startTime.toISOString() : null,
      endTime: endTime ? endTime.toISOString() : null,
    };
  }

  check() {
    if (this.selectedDays.length == 2 ) {
      return true;
    }
    return false;
  }

}
