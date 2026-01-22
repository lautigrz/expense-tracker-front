import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ExpenseEventsService {
  private expenseChangedSource = new Subject<void>();

  expenseChanged$ = this.expenseChangedSource.asObservable();

  notifyExpenseChanged(): void {
    this.expenseChangedSource.next();
  }
}
