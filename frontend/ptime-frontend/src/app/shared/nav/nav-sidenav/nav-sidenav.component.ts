import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface Link {
  icon: string;
  label: string;
  path: string;
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

  links: Link[] = [
    { icon: 'dashboard', label: 'Dashboard',       path: '/dashboard'   },
    { icon: 'account_balance', label: 'Finanzas',  path: '/incomes'     },
    { icon: 'checklist', label: 'Goals',           path: '/goals'       },
    { icon: 'trending_up', label: 'Progress',      path: '/books'       },
    { icon: 'shopping_cart', label: 'Shopping',    path: '/shopping'    },
    { icon: 'travel_explore', label: 'Travels',    path: '/travels'     },
    { icon: 'notifications', label: 'Notifications', path: '/notifications' },
    { icon: 'person', label: 'Profiles',           path: '/profiles'    }
  ];
}
