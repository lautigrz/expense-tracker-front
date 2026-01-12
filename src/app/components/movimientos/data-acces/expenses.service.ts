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

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYXV0aSIsInJvbGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzY4MTc3NTU4LCJleHAiOjE3NjgzNDQyMTh9.EzoH8tQcivPZwJ7lIxVVvgv0iMWBYN4xM_H0wIobsek"


    return this.httpClient.get<Expense[]>(`${this.baseUrl}/expense/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
