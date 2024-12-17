import { Routes } from '@angular/router';
import {ShopStartComponent} from './shop-start/shop-start.component';
import {ShopDashboardComponent} from './shop-dashboard/shop-dashboard.component';

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
  }
];
