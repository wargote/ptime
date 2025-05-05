import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export type Theme = 'Light' | 'Dark';
export interface UserProfileDto {
  id?: string;
  displayName: string;
  profileImageUrl: string;
  theme: Theme;
  language: string;
  settingsJson: string;
}

@Injectable({ providedIn: 'root' })
export class UserProfileApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getAll() {
    return this.http
      .get<ApiResponse<UserProfileDto[]>>(`${this.base}/UserProfile`)
      .pipe(map(r => r.data));
  }

  create(dto: UserProfileDto) {
    return this.http
      .post<ApiResponse<UserProfileDto>>(`${this.base}/UserProfile`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: UserProfileDto) {
    return this.http.put(`${this.base}/UserProfile/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/UserProfile/${id}`);
  }
}
