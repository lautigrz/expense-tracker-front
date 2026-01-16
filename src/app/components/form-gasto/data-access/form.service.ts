import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseRequest } from '../interfaces/expense';
import { Category } from '../../movimientos/interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {

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


  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/category`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
}
