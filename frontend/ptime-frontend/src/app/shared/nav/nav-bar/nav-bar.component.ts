import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { NavSidenavComponent } from '../nav-sidenav/nav-sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router'; 
import { MatMenuModule } from '@angular/material/menu';
import { inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service'; // ruta de tu servicio real

@Component({
  selector: 'pt-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    NavSidenavComponent
  ],  
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  private auth = inject(AuthService);

  user = {
    imageUrl: localStorage.getItem('profileImageUrl')
              ?? 'https://ui-avatars.com/api/?name=User'
  };

  logout() {
    this.auth.logout();
  }

}
