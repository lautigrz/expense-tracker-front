import { Component, inject, Input } from '@angular/core';
import { ExpensesService } from '../data-acces/expenses.service';
import { Expense } from '../interfaces/expense.interface';
import { Icon } from "../icon/icon";

@Component({
  selector: 'app-movimientos',
  imports: [Icon],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.css',
})
export class Movimientos {

  @Input() expensesMovimientos: Expense | undefined

}
