import { Component, Input, LOCALE_ID } from '@angular/core';
import { Expense } from '../interfaces/expense.interface';
import { Icon } from "../icon/icon";
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Dialog } from 'primeng/dialog';
import { FormGastos } from "../../form-gasto/form-gastos/form-gastos";
registerLocaleData(localeEs);
@Component({
  selector: 'app-movimientos',
  imports: [Icon, DatePipe, Dialog, FormGastos],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.css',
  providers: [
    { provide: LOCALE_ID, useValue: 'es' } // esto pone el locale a español
  ]
})
export class Movimientos {

  @Input() expensesMovimientos: Expense | undefined
  visibleDialog = false;

  openDialog(): void {
    this.visibleDialog = true;
  }

  closeDialog(): void {
    this.visibleDialog = false;
  }
}
