import { Routes } from '@angular/router';
import {ShopStartComponent} from './shop-start/shop-start.component';
import {ShopDashboardComponent} from './shop-dashboard/shop-dashboard.component';
import {ShopCartComponent} from './shop-cart/shop-cart.component';
import {ShopProfileComponent} from './shop-profile/shop-profile.component';
import {ShopDetailComponent} from './shop-detail/shop-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: ShopStartComponent,
    title: 'Shop'
  },
  {
    path: 'dashboard',
    component: ShopDashboardComponent,
    title: 'Dashboard'
  },
  {
    path: 'cart',
    component: ShopCartComponent,
    title: 'Warenkorb'
  },
  {
    path: 'profile',
    component: ShopProfileComponent,
    title: 'Profile'
  },
  {
    path: 'detail/:id',
    component: ShopDetailComponent,
    title: 'Detail'
  }
];
