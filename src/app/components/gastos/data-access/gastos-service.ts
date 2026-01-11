import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateRangeType } from '../enums/date.range';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient)

  getTotalGastado(dateRange: DateRangeType): Observable<number> {

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYXV0aSIsInJvbGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzY4MTY0MjU1LCJleHAiOjE3NjgzMzA5MTV9.1xjfdKHi4_z9XL8lAw0fGiT0hML8oVo_g0TU3yjHphA";

    return this.httpClient.get<number>(`${this.baseUrl}/analytics/summary`, {
      params: {
        filter: dateRange
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }


}
