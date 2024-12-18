import {Component, inject} from '@angular/core';
import {CardRowComponent} from '../card-row/card-row.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {EquipmentService} from '../equipment.service';
import {Equipment} from '../equipment';

@Component({
  selector: 'app-shop-detail',
  imports: [
    CardRowComponent,
    RouterLink
  ],
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.css'
})
export class ShopDetailComponent {
  equipment: Equipment | undefined;
  equipmentService = inject(EquipmentService)

  constructor(private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.equipment = this.equipmentService.getEquipmentById(this.route.snapshot.params['id'])
    console.log(this.route.snapshot.params['id'])
    console.log(this.equipment)
  }
}
