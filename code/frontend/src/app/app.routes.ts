import { Routes } from '@angular/router';
import {ShopStartComponent} from './shop-start/shop-start.component';
import {ShopCartComponent} from './shop-cart/shop-cart.component';
import {ShopDetailComponent} from './shop-detail/shop-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RoomReservationComponent} from './room-reservation/room-reservation.component';

export const routes: Routes = [
  {
    path: '',
    component: ShopStartComponent,
    title: 'Omnial'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Omnial'
  },
  {
    path: 'cart',
    component: ShopCartComponent,
    title: 'Omnial'
  },
  {
    path: 'room',
    component: RoomReservationComponent,
    title: 'Room'
  },
  {
    path: 'detail/:id',
    component: ShopDetailComponent,
    title: 'Omnial'
  }
];
