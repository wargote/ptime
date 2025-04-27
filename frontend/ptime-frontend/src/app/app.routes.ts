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
      path: 'incomes',
      loadChildren: () =>
        import('./modules/finances/incomes/incomes.routes').then(m => m.default),
      canActivate: [authGuard]
    },    
      {
        path: 'expenses',
        loadChildren: () =>
          import('./modules/finances/expenses/expenses.routes').then(m => m.default),
        canActivate: [authGuard]
      },
      {
        path: 'loans',
        loadChildren: () =>
          import('./modules/finances/loans/loans.routes').then(m => m.default),
        canActivate: [authGuard]
      },
      {
        path: 'debts',
        loadChildren: () =>
          import('./modules/finances/debts/debts.routes').then(m => m.default),
        canActivate: [authGuard]
      },      
      {
        path: 'reminders',
        loadChildren: () =>
          import('./modules/finances/payment-reminders/reminders.routes').then(m => m.default),
        canActivate: [authGuard]
      },
      {
        path: 'saving-goals',
        loadChildren: () =>
          import('./modules/finances/saving-goals/goals.routes').then(m => m.default),
        canActivate: [authGuard]
      },
      
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
