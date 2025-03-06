import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CardRowComponent} from '../card-row/card-row.component';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import {EquipmentService} from '../equipment.service';
import {NgForOf, NgIf} from '@angular/common';
import {LocalStorageService} from '../local-storage.service';
import {RentalEquipment} from '../rental-equipment';
import {FormsModule} from '@angular/forms';
import {HttpService} from '../http.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AmountSettingsComponent} from '../amount-settings/amount-settings.component';
import {Equipment} from '../interfaces';

@Component({
  selector: 'app-shop-detail',
  imports: [
    CardRowComponent,
    NgForOf,
    FormsModule,
    NgIf,
    AmountSettingsComponent,
  ],
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.css'
})
export class ShopDetailComponent {
  equipment: Equipment | undefined;
  httpService: HttpService = inject(HttpService)
  route = inject(ActivatedRoute)
  router = inject(Router)
  currentRentalService: LocalStorageService = inject(LocalStorageService)
  counter = -1
  @ViewChild(AmountSettingsComponent) amountSettingsComponent!: AmountSettingsComponent;
  private snackBar = inject(MatSnackBar);

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

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.httpService.getEquipmentById(this.route.snapshot.params['id']).subscribe( t => {
          this.equipment = t;
        })
        this.renderCalendar();
      }
    })
  }

  currentDate = new Date();
  selectedDays: number[] = [];
  days: { label: number | null; isWeekend: boolean; disabled: boolean; date: number }[] = [];

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
    this.snackBar.open('Hinzugefügt', 'Schließen')
    setTimeout(() => {
      this.snackBar.dismiss()
    } ,2500)
  }

  createRentalEquipment(equipment: Equipment): RentalEquipment {
    // Ensure selectedDays are sorted (start time is the earliest, end time is the latest)
    const sortedDays = this.selectedDays.sort((a, b) => a - b);

    // Construct startTime and endTime based on the selected days and the current month/year
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const startTime = sortedDays.length > 0 ? new Date(year, month, sortedDays[0]) : new Date();
    const endTime = sortedDays.length > 1 ? new Date(year, month, sortedDays[1]) : new Date();

    return {
      id: (this.counter += 1),
      equipmentID: equipment.id,
      count: this.amountSettingsComponent.getCurrentAmount(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };

  }

  check() {
    if(this.equipment?.available !== 0 && this.equipment != undefined) {  
      if (this.selectedDays.length == 2 && this.amountSettingsComponent.amount > 0) {
        return true;
      }
      return false;
    }
    return false;
  }
}
