import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface TaskItemDto {
  id?: string;
  title: string;
  description: string;
  status: 'Pendiente' | 'En progreso' | 'Terminada';
  dueDate: string;         // YYYY-MM-DD
  priority: number;        // 1‑5
}

@Injectable({ providedIn: 'root' })
export class TaskItemApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getTasks() {
    return this.http
      .get<ApiResponse<TaskItemDto[]>>(`${this.base}/TaskItem`)
      .pipe(map(r => r.data));
  }

  create(dto: TaskItemDto) {
    return this.http
      .post<ApiResponse<TaskItemDto>>(`${this.base}/TaskItem`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: TaskItemDto) {
    return this.http.put(`${this.base}/TaskItem/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/TaskItem/${id}`);
  }
}
