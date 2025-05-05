import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface BookReadDto {
  id?: string;
  title: string;
  author: string;
  finishedDate: string;   // YYYY-MM-DD
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class BookReadApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getBooks() {
    return this.http
      .get<ApiResponse<BookReadDto[]>>(`${this.base}/BookRead`)
      .pipe(map(r => r.data));
  }

  create(dto: BookReadDto) {
    return this.http
      .post<ApiResponse<BookReadDto>>(`${this.base}/BookRead`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: BookReadDto) {
    return this.http.put(`${this.base}/BookRead/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/BookRead/${id}`);
  }
}
