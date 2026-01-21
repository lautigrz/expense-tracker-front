import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog'
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Expense } from '../movimientos/interfaces/expense.interface';
import { Icon } from "../movimientos/icon/icon";

@Component({
  selector: 'app-confirm-delete',
  imports: [ConfirmDialogModule, DialogModule, ButtonModule, Icon, DecimalPipe, DatePipe],
  templateUrl: './confirm-delete.html',
  styleUrl: './confirm-delete.css',
})
export class ConfirmDelete {
  @Input() header: string = '';
  @Input() iconHeader: string = '';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() icon: string = '';
  @Input() visible: boolean = false;
  @Input() expense: Expense | undefined
  @Input() closeable: boolean = false;
  @Input() error: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();


  cerrarDialog() {
    this.close.emit();
    this.visible = false;
  }

  deleteExpense() {
    this.delete.emit();
    this.visible = false;
  }

}
