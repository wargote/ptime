import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface ExpenseDto {
  id?: string;
  amount: number;
  category: string;
  tags: string;
  date: string;      // YYYY-MM-DD
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class ExpenseApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getExpenses() {
    return this.http
      .get<ApiResponse<ExpenseDto[]>>(`${this.base}/Expense`)
      .pipe(map(r => r.data));
  }

  create(dto: ExpenseDto) {
    return this.http
      .post<ApiResponse<ExpenseDto>>(`${this.base}/Expense`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: ExpenseDto) {
    return this.http
      .put(`${this.base}/Expense/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/Expense/${id}`);
  }
}
