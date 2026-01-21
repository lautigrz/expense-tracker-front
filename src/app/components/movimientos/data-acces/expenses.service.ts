import { inject, Injectable } from '@angular/core';
import { Expense } from '../interfaces/expense.interface';
import { environment } from '../../../../environment/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  expenses: Expense[] = []

  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient)
  constructor() { }

  getExpenses(filter?: string, category?: string, fechas?: string[]): Observable<Expense[]> {
    const token = localStorage.getItem('token');

    const params = this.getParams(filter, category, fechas);

    return this.httpClient.get<Expense[]>(`${this.baseUrl}/expense`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  deleteExpense(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    return this.httpClient.delete<void>(`${this.baseUrl}/expense/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private getParams(filter?: string, category?: string, fechas?: string[]): HttpParams {
    let params = new HttpParams();

    if (filter && filter.trim().length > 0) {
      params = params.set('filter', filter);
    }


    if (category && category.trim().length > 0) {
      params = params.set('category', category);
    }

    if (
      Array.isArray(fechas) &&
      fechas.length === 2 &&
      fechas.every(f => typeof f === 'string' && f.trim() !== '')
    ) {
      params = params
        .set('from', fechas[0])
        .set('to', fechas[1]);
    }

    return params;
  }
}
