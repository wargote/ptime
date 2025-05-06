import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/nav/nav-bar/nav-bar.component';

@Component({
  selector: 'pt-root',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  template: `<pt-nav-bar></pt-nav-bar>` 
})
export class AppComponent {
  title = 'ptime-frontend';
}
