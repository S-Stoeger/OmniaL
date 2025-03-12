import { Routes } from '@angular/router';
import {ShopStartComponent} from './shop-start/shop-start.component';
import {ShopCartComponent} from './shop-cart/shop-cart.component';
import {ShopProfileComponent} from './shop-profile/shop-profile.component';
import {ShopDetailComponent} from './shop-detail/shop-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';

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
    path: 'profile',
    component: ShopProfileComponent,
    title: 'Omnial'
  },
  {
    path: 'detail/:id',
    component: ShopDetailComponent,
    title: 'Omnial'
  }
];
