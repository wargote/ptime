import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../core/config/api-url.token';
import { ApiResponse } from '../../../core/api/api-response';
import { map } from 'rxjs/operators';

export interface IncomeDto {
  id: string;
  amount: number;
  category: string;
  tags: string;
  date: string;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class FinanceApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  getIncomes() {
    return this.http.get<ApiResponse<IncomeDto[]>>(`${this.baseUrl}/Income`)
    .pipe(map(res => res.data));
  }

  // create, update, delete vendrán después
}
