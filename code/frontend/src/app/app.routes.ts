import { Routes } from '@angular/router';
import {ShopStartComponent} from './shop-start/shop-start.component';
import {ShopDashboardComponent} from './shop-dashboard/shop-dashboard.component';
import {ShopCartComponent} from './shop-cart/shop-cart.component';
import {ShopProfileComponent} from './shop-profile/shop-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: ShopStartComponent,
    title: 'Start'
  },
  {
    path: 'dashboard',
    component: ShopDashboardComponent,
    title: 'Dashboard'
  },
  {
    path: 'cart',
    component: ShopCartComponent,
    title: 'Shopping Cart'
  },
  {
    path: 'profile',
    component: ShopProfileComponent,
    title: 'Profile'
  }
];
