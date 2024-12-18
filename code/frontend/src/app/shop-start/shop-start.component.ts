import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CardRowComponent} from '../card-row/card-row.component';

@Component({
  selector: 'app-shop-start',
  imports: [
    NgOptimizedImage,
    CardRowComponent
  ],
  templateUrl: './shop-start.component.html',
  styleUrl: './shop-start.component.css'
})
export class ShopStartComponent {

}
