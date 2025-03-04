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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, NgForOf, DatePipe, NgIf, SelectedItemsComponent, NgClass]
})
export class DashboardComponent implements OnInit {
  httpService: HttpService = inject(HttpService)
  rentals: Rental[] = [];
  expandedRow: number | null = null;
  equipments: Equipment[] = [];
  isRowExpanded: boolean = false;

  ngOnInit() {
    this.httpService.getAllRentals()
      // filter out all rentals which have already been returned :) hopefully its working
      .pipe(map(rentals => rentals.filter((rental: Rental) => !(rental.isRented && rental.isReturned))))
      .subscribe(filteredRentals => {
        this.rentals = filteredRentals;
        console.log(this.rentals)
      });
  }

  getTime(id: number) {
    return `${this.parseDate(this.rentals[id].leaseDate+"")}-${this.parseDate(this.rentals[id].returnDate +"")}`;
  }

  parseDate(date: string) {
    return format(new Date(date), 'dd.MM.yy');
    console.log("a")
  }

  toggleRow(i: number) {
    this.getEquipmentOfRentalRequest(i)
    this.expandedRow = this.expandedRow === i ? null : i;
  }

  getEquipmentOfRentalRequest(id: number): void {
    this.httpService.getEquipmentByPersonId(this.rentals[id].person.id)?.subscribe(r => {
      this.equipments = r;
    });
  }

  getOpenRentals(): Rental[] {
    let openRentals: Rental[] = [];
    for (let rental of this.rentals) {
      if (!rental.isRented) {
          openRentals.push(rental);
      }
    }
    return openRentals;
  }

  getExpiredRentals(): Rental[] {
    let expiredRentals: Rental[] = [];
    for (let rental of this.rentals) {
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
}
