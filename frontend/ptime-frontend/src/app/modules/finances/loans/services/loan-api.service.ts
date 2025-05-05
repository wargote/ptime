import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface LoanDto {
  id?: string;
  amount: number;
  type: string;
  description: string;
  dueDate: string;   // YYYY-MM-DD
  status: string;
}

@Injectable({ providedIn: 'root' })
export class LoanApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getLoans() {
    return this.http
      .get<ApiResponse<LoanDto[]>>(`${this.base}/Loan`)
      .pipe(map(r => r.data));
  }
  create(dto: LoanDto) {
    return this.http
      .post<ApiResponse<LoanDto>>(`${this.base}/Loan`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }
  update(dto: LoanDto) {
    return this.http.put(`${this.base}/Loan/${dto.id}`, dto, { headers: this.json });
  }
  delete(id: string) {
    return this.http.delete(`${this.base}/Loan/${id}`);
  }
}
