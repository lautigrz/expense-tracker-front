import { Routes } from '@angular/router';

export default [

  {
    path: 'registro',
    loadComponent: () => import('./register/register').then(m => m.Register),
  }

] as Routes;