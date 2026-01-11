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

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYXV0aSIsInJvbGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzY4MTU2OTIwLCJleHAiOjE3NjgzMjM1ODB9.zMG3SeM-IqZdH1rI40FbARqaaHkwzhbWntDUyPy5Jzw"


    return this.httpClient.get<Expense[]>(`${this.baseUrl}/expense/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
