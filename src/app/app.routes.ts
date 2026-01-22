import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.default)
  },
  {
    path: 'home',
    loadChildren: () => import('./features/expenses/pages/home/home.routes').then(m => m.default)
  },
  {
    path: 'filtro',
    loadChildren: () => import('./features/expenses/pages/filters/filtro.routes').then(m => m.default)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
