import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environments';
import { HttpClient } from '@angular/common/http';
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



  getTotalGastado(dateRange: DateRangeType): Observable<number> {


    return this.httpClient.get<number>(`${this.baseUrl}/analytics/summary`, {
      params: {
        filter: dateRange
      },
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


}
