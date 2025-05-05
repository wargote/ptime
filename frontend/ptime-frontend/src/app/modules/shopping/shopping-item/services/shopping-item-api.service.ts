import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export type ItemStatus = 'Pendiente' | 'Comprado' | 'Cancelado';

export interface ShoppingItemDto {
  id?: string;
  name: string;
  category: string;
  status: ItemStatus;
  createdDate: string;    // YYYY-MM-DD
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class ShoppingItemApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getItems() {
    return this.http
      .get<ApiResponse<ShoppingItemDto[]>>(`${this.base}/ShoppingItem`)
      .pipe(map(r => r.data));
  }

  create(dto: ShoppingItemDto) {
    return this.http
      .post<ApiResponse<ShoppingItemDto>>(`${this.base}/ShoppingItem`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: ShoppingItemDto) {
    return this.http.put(`${this.base}/ShoppingItem/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/ShoppingItem/${id}`);
  }
}
