import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config/api-url.token';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  private readonly TOKEN_KEY = 'jwt';

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  set token(value: string | null) {
    value ? localStorage.setItem(this.TOKEN_KEY, value) : localStorage.removeItem(this.TOKEN_KEY);
  }

  login(credentials: { email: string; password: string }) {
    console.log(credentials)
    return this.http.post<{ token: string }>(`${this.baseUrl}/Auth/login`, credentials)
      .pipe(tap(res => (this.token = res.token)));
  }

  logout() {
    this.token = null;
  }

  isAuthenticated() {
    return !!this.token;
  }
}
