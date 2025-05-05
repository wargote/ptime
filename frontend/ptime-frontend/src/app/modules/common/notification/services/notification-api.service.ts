import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export type NotifType = 'Info' | 'Warning' | 'Error';
export type NotifStatus = 'Pendiente' | 'Enviada';

export interface NotificationDto {
  id?: string;
  message: string;
  type: NotifType;
  sentDate: string;        // ISO
  status: NotifStatus;
}

@Injectable({ providedIn: 'root' })
export class NotificationApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getAll() {
    return this.http
      .get<ApiResponse<NotificationDto[]>>(`${this.base}/Notification`)
      .pipe(map(r => r.data));
  }

  create(dto: NotificationDto) {
    return this.http
      .post<ApiResponse<NotificationDto>>(`${this.base}/Notification`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: NotificationDto) {
    return this.http.put(`${this.base}/Notification/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/Notification/${id}`);
  }
}
