import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {HttpService} from '../http.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Equipment, Rental} from '../interfaces';
import {map} from 'rxjs';
import {SelectedItemsComponent} from '../selected-items/selected-items.component';
import {RentalEquipment} from '../rental-equipment';
import {format} from 'date-fns';
import {Person} from '../person';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, NgForOf, DatePipe, NgIf, NgClass]
})
export class DashboardComponent implements OnInit {
  httpService: HttpService = inject(HttpService)
  rentals: Rental[] = [];
  tableRentals: Rental[] = []
  expandedRow: number | null = null;
  equipments: Equipment[] = [];
  sortingOrder: number = 1;
  private currentSortKey: string = "";


  ngOnInit() {
    this.httpService.getAllRentals()
      // filter out all rentals which have already been returned :) hopefully its working
      .pipe(map(rentals => rentals.filter((rental: Rental) => !(rental.isRented && rental.isReturned))))
      .subscribe(filteredRentals => {
        this.rentals = filteredRentals;
        this.tableRentals = this.rentals;
      });
  }

  getTime(id: number) {
    return `${this.parseDate(this.tableRentals[id].leaseDate+"")}-${this.parseDate(this.tableRentals[id].returnDate +"")}`;
  }

  parseDate(date: string) {
    return format(new Date(date), 'dd.MM.yy');
  }

  toggleRow(i: number | null) {
    if (i != null && this.expandedRow !== i) {
      this.getEquipmentOfRentalRequest(i);
    }
    this.expandedRow = this.expandedRow === i ? null : i;
  }

  getEquipmentOfRentalRequest(id: number): void {
    this.httpService.getEquipmentByPersonId(this.tableRentals[id].person.id)?.subscribe(r => {
      this.equipments = r;
    });
  }

  getOpenReturns(): Rental[] {
    let openRentals: Rental[] = [];
    for (let rental of this.tableRentals) {
      if (rental.isRented && !rental.isReturned) {
          openRentals.push(rental);
      }
    }
    return openRentals;
  }

  getExpiredRentals(): Rental[] {
    let expiredRentals: Rental[] = [];
    for (let rental of this.tableRentals) {
      if (this.isRentalExpired(rental)) {
        expiredRentals.push(rental);
      }
    }
    return expiredRentals;
  }

  isRentalExpired(rental: Rental): boolean {
    const today = new Date(new Date().toISOString().split('T')[0]);
    const returnDateParsed = new Date(new Date(rental.returnDate).toISOString().split('T')[0]);

    return returnDateParsed < today
  }

  sortRentals(keyWord: "name" | "email" | "grade" | "date") {
    this.toggleRow(this.expandedRow)

    if (this.currentSortKey === keyWord) {
      this.sortingOrder *= -1;
    } else {
      this.sortingOrder = 1;
      this.currentSortKey = keyWord;
    }

    return this.tableRentals.sort((a, b) => {
      let valueA;
      let valueB;

      if (keyWord === "name") {
        valueA = `${a.person.firstname} ${a.person.surname}`.toLowerCase();
        valueB = `${b.person.firstname} ${b.person.surname}`.toLowerCase();
      } else if (keyWord === "date") {
        valueA = new Date(a.leaseDate).getTime();
        valueB = new Date(b.leaseDate).getTime();
      }
      else {
        valueA = a.person[keyWord].toLowerCase();
        valueB = b.person[keyWord].toLowerCase();
      }

      if (valueA < valueB) return -1 * this.sortingOrder;
      if (valueA > valueB) return this.sortingOrder;
      return 0;
    });
  }

  filterExpiredRentals(): void {
    const currentDate = new Date();
    this.tableRentals = this.getExpiredRentals();
  }

  filterOpenReturns() {
    this.tableRentals = this.getOpenReturns();
  }
}
