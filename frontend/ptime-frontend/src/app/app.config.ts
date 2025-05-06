import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { API_URL } from './core/config/api-url.token';
import { environment } from '../environments/environment';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    { provide: API_URL, useValue: environment.apiUrl }, provideAnimationsAsync()
  ]
};
