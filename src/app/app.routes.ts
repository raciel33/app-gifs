import { Routes } from '@angular/router';

export const routes: Routes = [
  //ejemplo de carga perezosa de un componente( en el mismo se ha puesto un export default class nombreComponente)
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard/dashboard.component'),
    //RUTAS HIJAS PARA QUE SE MUESTREN DENTRO DE ESTE COMPONENTE(luego hay que establecer el router-outler dentro del component.html)
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending/trending'),
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search/search'),
      },
      {
        path: 'history/:gif',
        loadComponent: () => import('./gifs/pages/gifs-history/gifs-history'),
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
