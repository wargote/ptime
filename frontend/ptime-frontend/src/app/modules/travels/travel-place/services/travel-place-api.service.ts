import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../../core/config/api-url.token';
import { ApiResponse } from '../../../../core/api/api-response';

export interface TravelPlaceDto {
  id?: string;
  type: 'Ciudad/Pais' | 'Restaurante' | 'Hotel';
  name: string;
  location: string;
  state: 'Por visitar' | 'Visitado' | 'Favorito';
  notes: string;
  photoUrl: string;
}

@Injectable({ providedIn: 'root' })
export class TravelPlaceApiService {
  private http = inject(HttpClient);
  private base = inject(API_URL);
  private json = new HttpHeaders({ 'Content-Type': 'application/json' });

  getPlaces() {
    return this.http
      .get<ApiResponse<TravelPlaceDto[]>>(`${this.base}/TravelPlace`)
      .pipe(map(r => r.data));
  }

  create(dto: TravelPlaceDto) {
    return this.http
      .post<ApiResponse<TravelPlaceDto>>(`${this.base}/TravelPlace`, dto, { headers: this.json })
      .pipe(map(r => r.data));
  }

  update(dto: TravelPlaceDto) {
    return this.http.put(`${this.base}/TravelPlace/${dto.id}`, dto, { headers: this.json });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/TravelPlace/${id}`);
  }
}
