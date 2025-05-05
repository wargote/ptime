import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface SavingGoalDto {
  id?: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;    // YYYY-MM-DD
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class SavingGoalApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getGoals() {
    return this.http
      .get<ApiResponse<SavingGoalDto[]>>(`${this.base}/SavingGoal`)
      .pipe(map(r => r.data));
  }

  create(dto: SavingGoalDto) {
    return this.http
      .post<ApiResponse<SavingGoalDto>>(`${this.base}/SavingGoal`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: SavingGoalDto) {
    return this.http.put(`${this.base}/SavingGoal/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/SavingGoal/${id}`);
  }
}
