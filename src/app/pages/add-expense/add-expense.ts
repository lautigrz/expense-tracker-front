import { Component } from '@angular/core';
import { AddGasto } from "../../components/nuevo-gasto/add-gasto/add-gasto";

@Component({
  selector: 'app-add-expense',
  imports: [AddGasto],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense {

}
