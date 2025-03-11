import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./pages/clientes/cliente-list/cliente-list.component').then(
        (m) => m.ClienteListComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
