import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseRequest } from '../models/expense-request';

@Injectable({
  providedIn: 'root',
})
export class ExpenseFormService {

  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);
  private token = localStorage.getItem('token');


  constructor() { }


  addExpense(expense: ExpenseRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/expense`, expense, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  editExpense(id: number, expense: ExpenseRequest): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/expense/${id}`, expense, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
}
