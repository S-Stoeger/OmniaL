import {Component, inject, OnInit} from '@angular/core';
import {SelectedItemsComponent} from '../selected-items/selected-items.component';
import {LocalStorageService} from '../local-storage.service';
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
export class ShopCartComponent implements OnInit {
  rental: RentalEquipment[] = [];
  rentalService: LocalStorageService = inject(LocalStorageService)

  constructor() {
    /*this.rentalService.loadFromLocalStorage()
    this.rental = this.rentalService.equipments
    console.log(this.rental)*/
    this.rentalService.warenkorb.subscribe((res: any) => {
      this.rental = res;
    })
  }

  ngOnInit() {
      this.rentalService.loadFromLocalStorage()
  }


}
