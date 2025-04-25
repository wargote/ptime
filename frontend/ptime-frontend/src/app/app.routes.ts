import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./core/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./modules/dashboard/dashboard.routes').then(m => m.default),
        canActivate: [authGuard]
    },
    {
        path: 'finances',
        loadChildren: () =>
          import('./modules/finances/finances.routes').then(m => m.default),
        canActivate: [authGuard]
      },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
