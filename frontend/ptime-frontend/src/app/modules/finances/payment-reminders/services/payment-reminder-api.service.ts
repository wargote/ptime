import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface PaymentReminderDto {
  id?: string;
  title: string;
  dueDate: string;    // YYYY-MM-DD
  notes: string;
  alertSent: boolean;
}

@Injectable({ providedIn: 'root' })
export class PaymentReminderApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getReminders() {
    return this.http
      .get<ApiResponse<PaymentReminderDto[]>>(`${this.base}/PaymentReminder`)
      .pipe(map(r => r.data));
  }

  create(dto: PaymentReminderDto) {
    return this.http
      .post<ApiResponse<PaymentReminderDto>>(`${this.base}/PaymentReminder`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: PaymentReminderDto) {
    return this.http.put(`${this.base}/PaymentReminder/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/PaymentReminder/${id}`);
  }
}
