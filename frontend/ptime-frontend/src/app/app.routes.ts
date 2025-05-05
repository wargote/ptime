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
      {
        path: 'calendar-events',
        loadChildren: () =>
          import('./modules/goals/calendar-event/calendar.routes').then(m => m.default),
        canActivate: [authGuard]
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./modules/goals/task-item/tasks.routes').then(m => m.default),
        canActivate: [authGuard]
      },
      {
        path: 'books',
        loadChildren: () =>
          import('./modules/progress/book-read/book.routes').then(m => m.default),
        canActivate: [authGuard]
      },
      {
        path: 'weights',
        loadChildren: () =>
          import('./modules/progress/weight-record/weight.routes').then(m => m.default),
        canActivate: [authGuard]
      },
      {
        path: 'gym',
        loadChildren: () =>
          import('./modules/progress/gym-attendance/gym.routes').then(m => m.default),
        canActivate: [authGuard]
      },
      {
        path: 'shopping',
        loadChildren: () =>
          import('./modules/shopping/shopping-item/shopping.routes').then(m => m.default),
        canActivate: [authGuard]
      },
      {
        path: 'travels',
        loadChildren: () =>
          import('./modules/travels/travel-place/travel.routes').then(m => m.default),
        canActivate: [authGuard]
      },      
      {
        path: 'notifications',
        loadChildren: () =>
          import('./modules/common/notification/notif.routes').then(m => m.default),
        canActivate: [authGuard]
      },
      {
        path: 'profiles',
        loadChildren: () =>
          import('./modules/common/user-profile/profile.routes').then(m => m.default),
        canActivate: [authGuard]
      },
            
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
