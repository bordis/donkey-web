import { Routes } from '@angular/router';
import { sponsoredGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'create-post',
    loadComponent: () => import('./components/create-post/create-post').then(m => m.CreatePostComponent),
    canActivate: [sponsoredGuard]
  },
  { path: '**', redirectTo: '' }
];
