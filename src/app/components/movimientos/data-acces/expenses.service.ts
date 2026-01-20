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

    let params = new HttpParams();

    if (filter && filter.trim().length > 0) {
      params = params.set('filter', filter);
    }


    if (category && category.trim().length > 0) {
      params = params.set('category', category);
    }

    if (fechas && fechas.length === 2) {
      console.log("fechas", fechas);
      params = params.set('from', fechas[0]);
      params = params.set('to', fechas[1]);
    }

    return this.httpClient.get<Expense[]>(`${this.baseUrl}/expense`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


}
