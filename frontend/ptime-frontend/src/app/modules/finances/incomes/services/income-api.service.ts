import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface IncomeDto {
  id?: string;
  amount: number;
  category: string;
  tags: string;
  date: string;   // YYYY-MM-DD
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class IncomeApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getIncomes() {
    return this.http
      .get<ApiResponse<IncomeDto[]>>(`${this.base}/Income`)
      .pipe(map(r => r.data));
  }

  create(dto: IncomeDto) {
    return this.http
      .post<ApiResponse<IncomeDto>>(`${this.base}/Income`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: IncomeDto) {
    return this.http.put(`${this.base}/Income/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/Income/${id}`);
  }
}
