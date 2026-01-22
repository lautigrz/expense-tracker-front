import { Component, EventEmitter, Input, LOCALE_ID, Output } from '@angular/core';
import { Expense } from '../../models/expense.interface';
import { Icon } from "../expense-icon/icon";
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Dialog } from 'primeng/dialog';
import { FormGastos } from "../expense-form/form-gastos";
import { DialogDelete } from "../expense-delete-dialog/dialog-delete";
import { DecimalPipe } from '@angular/common';

registerLocaleData(localeEs);
@Component({
  selector: 'app-movimientos',
  imports: [Icon, DatePipe, Dialog, FormGastos, DialogDelete, DecimalPipe],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.css',
  providers: [
    { provide: LOCALE_ID, useValue: 'es' } // esto pone el locale a español
  ]
})
export class Movimientos {

  @Input() expensesMovimientos: Expense | undefined
  @Input() error: boolean = false;
  @Output() delete = new EventEmitter<number>();
  visibleDialog = false;
  visibleConfirmDelete = false;

  openDialog(): void {
    this.visibleDialog = true;
  }

  closeDialog(): void {
    this.visibleDialog = false;
    this.visibleConfirmDelete = false;
  }

  openConfirmDelete(): void {
    this.visibleConfirmDelete = true;
  }

  deleteExpense(): void {
    this.delete.emit(this.expensesMovimientos?.id);
    this.visibleConfirmDelete = false;
  }
}
