import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./features/users/user-list/user-list.component')
    .then(m => m.UserListComponent)
  },
{
    path: '',
    redirectTo: 'users', 
    pathMatch: 'full'
  }
];