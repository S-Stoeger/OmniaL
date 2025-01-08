import { Component } from '@angular/core';
import {SelectedItemsComponent} from '../selected-items/selected-items.component';

@Component({
  selector: 'app-shop-cart',
  imports: [
    SelectedItemsComponent
  ],
  templateUrl: './shop-cart.component.html',
  styleUrl: './shop-cart.component.css'
})
export class ShopCartComponent {

}
