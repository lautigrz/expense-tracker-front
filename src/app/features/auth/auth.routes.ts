import { Routes } from '@angular/router';

export default [

  {
    path: 'registro',
    loadComponent: () => import('./pages/register/register').then(m => m.Register),
  }

] as Routes;