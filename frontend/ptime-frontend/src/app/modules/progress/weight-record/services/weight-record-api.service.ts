import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface WeightRecordDto {
  id?: string;
  date: string;   // YYYY-MM-DD
  weight: number; // kg
}

@Injectable({ providedIn: 'root' })
export class WeightRecordApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getRecords() {
    return this.http
      .get<ApiResponse<WeightRecordDto[]>>(`${this.base}/WeightRecord`)
      .pipe(map(r => r.data));
  }

  create(dto: WeightRecordDto) {
    return this.http
      .post<ApiResponse<WeightRecordDto>>(`${this.base}/WeightRecord`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: WeightRecordDto) {
    return this.http.put(`${this.base}/WeightRecord/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/WeightRecord/${id}`);
  }
}
