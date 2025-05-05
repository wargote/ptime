import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface DebtDto {
  id?: string;
  description: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;      // YYYY-MM-DD
  status: string;
}

@Injectable({ providedIn: 'root' })
export class DebtApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getDebts() {
    return this.http
      .get<ApiResponse<DebtDto[]>>(`${this.base}/Debt`)
      .pipe(map(r => r.data));
  }

  create(dto: DebtDto) {
    return this.http
      .post<ApiResponse<DebtDto>>(`${this.base}/Debt`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: DebtDto) {
    return this.http.put(`${this.base}/Debt/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/Debt/${id}`);
  }
}
