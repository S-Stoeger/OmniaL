import {Component, Input} from '@angular/core';
import {Reservation} from '../reservation';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-selected-items',
  imports: [
    NgForOf
  ],
  templateUrl: './selected-items.component.html',
  styleUrl: './selected-items.component.css'
})
export class SelectedItemsComponent {
  @Input() reservation!: Reservation;

  constructor() {
    console.log(this.reservation)
  }


}
