import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface GymAttendanceDto {
  id?: string;
  date: string;    
}

@Injectable({ providedIn: 'root' })
export class GymAttendanceApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getSessions() {
    return this.http
      .get<ApiResponse<GymAttendanceDto[]>>(`${this.base}/GymAttendance`)
      .pipe(map(r => r.data));
  }

  create(dto: GymAttendanceDto) {
    return this.http
      .post<ApiResponse<GymAttendanceDto>>(`${this.base}/GymAttendance`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: GymAttendanceDto) {
    return this.http.put(`${this.base}/GymAttendance/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/GymAttendance/${id}`);
  }
}
