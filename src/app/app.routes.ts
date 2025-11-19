import { Routes } from '@angular/router';
import { Login } from './auth/feature/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/feature/auth.routes').then(m => m.default)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes').then(m => m.default)
  }
];
