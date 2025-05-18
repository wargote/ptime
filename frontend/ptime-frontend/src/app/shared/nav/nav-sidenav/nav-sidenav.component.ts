import { Component, Output, EventEmitter, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/auth/auth.service'; 

interface NavItem {
  icon: string;
  label: string;
  path?: string;        
  children?: NavItem[]; 
}

@Component({
  selector: 'pt-nav-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule, MatIconModule],
  templateUrl: './nav-sidenav.component.html',
  styleUrl: './nav-sidenav.component.scss'
})
export class NavSidenavComponent {
  @Output() close = new EventEmitter<void>();
  
  readonly primary = '#673ab7';
  private auth   = inject(AuthService);
  private router = inject(Router);

  user = this.auth.currentUser ?? {
    name: 'User',
    email: '',
    sub: ''
  };
  avatarUrl = 'https://ui-avatars.com/api/?name=User'
  
  links: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },

    { icon: 'account_balance', label: 'Finances', children: [
        { icon: 'trending_up', label: 'Ingresos',   path: '/incomes'   },
        { icon: 'trending_down', label: 'Gastos',   path: '/expenses'  },
        { icon: 'savings', label: 'Metas ahorro',   path: '/saving-goals' },
        { icon: 'receipt', label: 'Préstamos',      path: '/loans'     },
        { icon: 'credit_card', label: 'Deudas',     path: '/debts'     },
        { icon: 'alarm', label: 'Recordatorios',    path: '/reminders' }
    ]},
  
    { icon: 'checklist', label: 'Goals', children: [
        { icon: 'task', label: 'Tareas',     path: '/tasks'     },
        { icon: 'event', label: 'Eventos',   path: '/calendar-events' }
    ]},
  
    { icon: 'trending_up', label: 'Progress', children: [
        { icon: 'book', label: 'Libros',     path: '/books'     },
        { icon: 'fitness_center', label: 'Gym', path: '/gym'    },
        { icon: 'monitor_weight', label: 'Peso', path: '/weights'}
    ]},
  
    { icon: 'shopping_cart', label: 'Shopping', path: '/shopping' },
  
    { icon: 'travel_explore', label: 'Travels', path: '/travels' },
  
    { icon: 'notifications', label: 'Notifications', path: '/notifications' },
  
    { icon: 'person', label: 'Profiles', path: '/profiles' }
  ];

  private opened = new Set<NavItem>();

  toggle(item: NavItem): void {
    this.opened.has(item) ? this.opened.delete(item)
                          : this.opened.add(item);
  }

  isOpen(item: NavItem): boolean {
    if (this.opened.has(item)) return true;

    return item.children?.some(c =>
      c.path && this.router.url.startsWith(c.path)
    ) ?? false;
  }

  logout(): void {
    this.auth.logout();           
    this.close.emit();            
    this.router.navigate(['/login']);
  }

}
