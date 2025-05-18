import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NavBarComponent } from './shared/nav/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pt-root',
  standalone: true,
  imports: [NavBarComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  template: `<pt-nav-bar></pt-nav-bar>` 
})
export class AppComponent {
  title = 'ptime-frontend';

  readonly isLoginRoute$: Observable<boolean>;

  constructor(private router: Router) {
    this.isLoginRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event =>
        (event as NavigationEnd).urlAfterRedirects.startsWith('/login')
      ),
      startWith(this.router.url.startsWith('/login'))
    );
  }
}
