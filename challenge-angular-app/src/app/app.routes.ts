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
    path: 'clientes/novo',
    loadComponent: () =>
      import('./pages/clientes/cliente-form/cliente-form.component').then(
        (m) => m.ClienteFormComponent
      ),
  },
  {
    path: 'clientes/editar/:clienteId',
    loadComponent: () =>
      import('./pages/clientes/cliente-form/cliente-form.component').then(
        (m) => m.ClienteFormComponent
      ),
  },
  {
    path: 'produtos',
    loadComponent: () =>
      import('./pages/produtos/produto-list/produto-list.component').then(
        (m) => m.ProdutoListComponent
      ),
  },
  {
    path: 'produtos/novo',
    loadComponent: () =>
      import('./pages/produtos/produto-form/produto-form.component').then(
        (m) => m.ProdutoFormComponent
      ),
  },
  {
    path: 'produtos/editar/:produtoId',
    loadComponent: () =>
      import('./pages/produtos/produto-form/produto-form.component').then(
        (m) => m.ProdutoFormComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
