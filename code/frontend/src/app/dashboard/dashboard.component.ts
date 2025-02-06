import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { DashboardDataSource, DashboardItem } from './dashboard-datasource';
import {Rental} from '../rental';
import {HttpService} from '../http.service';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, NgIf]
})
export class DashboardComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Rental>;
  dataSource = new MatTableDataSource<Rental>();
  httpService: HttpService = inject(HttpService)

  displayedColumns = ['studentName', 'class', 'email', 'date', 'status'];

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Rental>();
    this.refreshData()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  refreshData(): void {
    this.httpService.getAllRentals().subscribe(
      (rentalList) => {
        this.dataSource.data = rentalList;
        console.log(rentalList);
      }
    )
  }
}
