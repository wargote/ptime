import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { NavBarComponent } from './shared/nav/nav-bar/nav-bar.component';
import { loginGuard } from './core/auth/login.guard';  

export const routes: Routes = [
  /* 1️⃣  Ruta pública (sin navbar) */
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login.component')
        .then(m => m.LoginComponent),
    canActivate: [loginGuard]           //  ⬅️  lo añades aquí
  },

  /* 2️⃣  Shell autenticado: contiene la barra lateral y su propio <router-outlet> */
  {
    path: '',
    component: NavBarComponent,      // ★ el contenedor
    canActivate: [authGuard],        // protege TODO lo que esté dentro
    // ─────────────────────────────
    // todas las vistas internas como HIJAS
    // ─────────────────────────────
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routes')
            .then(m => m.default)
      },
      {
        path: 'incomes',
        loadChildren: () =>
          import('./modules/finances/incomes/incomes.routes')
            .then(m => m.default)
      },
      {
        path: 'expenses',
        loadChildren: () =>
          import('./modules/finances/expenses/expenses.routes')
            .then(m => m.default)
      },
      {
        path: 'loans',
        loadChildren: () =>
          import('./modules/finances/loans/loans.routes')
            .then(m => m.default)
      },
      {
        path: 'debts',
        loadChildren: () =>
          import('./modules/finances/debts/debts.routes')
            .then(m => m.default)
      },
      {
        path: 'reminders',
        loadChildren: () =>
          import('./modules/finances/payment-reminders/reminders.routes')
            .then(m => m.default)
      },
      {
        path: 'saving-goals',
        loadChildren: () =>
          import('./modules/finances/saving-goals/goals.routes')
            .then(m => m.default)
      },
      {
        path: 'calendar-events',
        loadChildren: () =>
          import('./modules/goals/calendar-event/calendar.routes')
            .then(m => m.default)
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./modules/goals/task-item/tasks.routes')
            .then(m => m.default)
      },
      {
        path: 'books',
        loadChildren: () =>
          import('./modules/progress/book-read/book.routes')
            .then(m => m.default)
      },
      {
        path: 'weights',
        loadChildren: () =>
          import('./modules/progress/weight-record/weight.routes')
            .then(m => m.default)
      },
      {
        path: 'gym',
        loadChildren: () =>
          import('./modules/progress/gym-attendance/gym.routes')
            .then(m => m.default)
      },
      {
        path: 'shopping',
        loadChildren: () =>
          import('./modules/shopping/shopping-item/shopping.routes')
            .then(m => m.default)
      },
      {
        path: 'travels',
        loadChildren: () =>
          import('./modules/travels/travel-place/travel.routes')
            .then(m => m.default)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./modules/common/notification/notif.routes')
            .then(m => m.default)
      },
      {
        path: 'profiles',
        loadChildren: () =>
          import('./modules/common/user-profile/profile.routes')
            .then(m => m.default)
      },

      /* Redirección por defecto dentro del shell */
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  /* 3️⃣  Fallback: cualquier ruta desconocida → dashboard/login según estado */
  { path: '**', redirectTo: '' }
];
