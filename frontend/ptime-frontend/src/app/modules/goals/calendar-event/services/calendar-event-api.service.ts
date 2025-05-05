import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface CalendarEventDto {
  id?: string;
  title: string;
  startDateTime: string;   // ISO
  endDateTime: string;     // ISO
  notes: string;
  syncedWithGoogle: boolean;
}

@Injectable({ providedIn: 'root' })
export class CalendarEventApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getEvents() {
    return this.http
      .get<ApiResponse<CalendarEventDto[]>>(`${this.base}/CalendarEvent`)
      .pipe(map(r => r.data));
  }

  create(dto: CalendarEventDto) {
    return this.http
      .post<ApiResponse<CalendarEventDto>>(`${this.base}/CalendarEvent`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: CalendarEventDto) {
    return this.http.put(`${this.base}/CalendarEvent/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/CalendarEvent/${id}`);
  }
}
