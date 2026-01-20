import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateRangeType } from '../enums/date.range';
import { TopCategory } from '../interfaces/top-category';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient)
  private token = localStorage.getItem('token');


  getTotalGastado(dateRange?: DateRangeType, category?: string, fechas?: string[]): Observable<number> {

    const params = this.getParams(dateRange, category, fechas);

    return this.httpClient.get<number>(`${this.baseUrl}/analytics/summary`, {
      params,
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  getTopCategories(dateRange: DateRangeType): Observable<TopCategory[]> {

    return this.httpClient.get<TopCategory[]>(`${this.baseUrl}/analytics/summary/top-categories`, {
      params: {
        filter: dateRange
      },
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }


  getVariation(): Observable<number> {

    return this.httpClient.get<number>(`${this.baseUrl}/analytics/summary/monthly-comparison`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  private getParams(dateRange?: DateRangeType, category?: string, fechas?: string[]): HttpParams {
    let params = new HttpParams();

    if (dateRange && dateRange.trim().length > 0) {
      params = params.set('filter', dateRange);
    }

    if (category && category.trim().length > 0) {
      params = params.set('category', category);
    }

    if (fechas && fechas.length === 2) {
      params = params.set('from', fechas[0]);
      params = params.set('to', fechas[1]);
    }
    return params;
  }
}
