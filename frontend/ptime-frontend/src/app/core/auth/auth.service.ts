import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config/api-url.token';
import { tap } from 'rxjs/operators';

export interface JwtUser {
  sub:  string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);
  private readonly TOKEN_KEY = 'jwt';

  /* ---------- token helpers ---------- */
  get token(): string | null   { return localStorage.getItem(this.TOKEN_KEY); }
  set token(value: string|null){ value
      ? localStorage.setItem(this.TOKEN_KEY, value)
      : localStorage.removeItem(this.TOKEN_KEY); }

  /* ---------- decode payload ---------- */
  private decodeToken(token: string): JwtUser {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      sub  : payload.sub,
      name : payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
             ?? payload.name
             ?? 'User',
      email: payload.email
    };
  }

  /* ---------- current user ---------- */
  get currentUser(): JwtUser | null {
    if (!this.token) return null;
    try { return this.decodeToken(this.token); }
    catch { return null; }
  }

  /* ---------- API calls ---------- */
  login(credentials: { email: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/Auth/login`, credentials)
      .pipe(tap(res => (this.token = res.token)));
  }

  logout() { this.token = null; }

  isAuthenticated() { return !!this.token; }
}
