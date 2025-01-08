import {Component, inject} from '@angular/core';
import {SelectedItemsComponent} from '../selected-items/selected-items.component';
import {CurrentRentalService} from '../current-rental.service';
import {RentalEquipment} from '../rental-equipment';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  imports: [
    SelectedItemsComponent
  ],
  styleUrl: './shop-cart.component.css'
})
export class ShopCartComponent {
  rental: RentalEquipment[];
  rentalService: CurrentRentalService = inject(CurrentRentalService)

  constructor() {
    this.rentalService.loadFromLocalStorage()
    this.rental = this.rentalService.equipments
    console.log(this.rental)
  }




}
