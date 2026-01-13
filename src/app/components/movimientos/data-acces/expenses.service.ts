import { inject, Injectable } from '@angular/core';
import { Expense } from '../interfaces/expense.interface';
import { environment } from '../../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  expenses: Expense[] = []

  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient)
  constructor() { }

  getExpenses(): Observable<Expense[]> {

    const token = localStorage.getItem('token');


    return this.httpClient.get<Expense[]>(`${this.baseUrl}/expense/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
