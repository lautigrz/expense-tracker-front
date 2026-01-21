import { Component, inject, OnInit } from '@angular/core';
import { GraficoGastos } from "../../components/gastos/feature/grafico-gastos/grafico-gastos";
import { TotalGastos } from "../../components/gastos/feature/total-gastos/total-gastos";
import { Nav } from "../../shared/layout/nav/nav";
import { Movimientos } from "../../components/movimientos/ultimos-movimientos/movimientos";
import { ExpensesService } from '../../components/movimientos/data-acces/expenses.service';
import { Expense } from '../../components/movimientos/interfaces/expense.interface';
import { GastosService } from '../../components/gastos/data-access/gastos-service';
import { DateRangeType } from '../../components/gastos/enums/date.range';
import { DecimalPipe } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { FormGastos } from "../../components/form-gasto/form-gastos/form-gastos";
import { ExpenseEventsService } from '../../components/form-gasto/data-access/expense-events.service';
import { forkJoin } from 'rxjs';
import { Loading } from "../../shared/ui/loading/loading";
import { dashboardPageAnimation } from '../../shared/animations/init.animations';
import { EmptyState } from "../../shared/ui/empty-state/empty-state";
import { ConfirmDelete } from '../../components/confirm-delete/confirm-delete';

@Component({
  selector: 'app-home',
  imports: [GraficoGastos, TotalGastos, Nav, Movimientos, DecimalPipe, Dialog, FormGastos, Loading, EmptyState, ConfirmDelete],
  templateUrl: './home.html',
  styleUrl: './home.css',
  animations: [dashboardPageAnimation]
})
export class Home implements OnInit {

  private expensesService = inject(ExpensesService)
  private expenseEventsService = inject(ExpenseEventsService)
  private gastosService = inject(GastosService)

  expensesMovimientos: Expense[] = []
  totalSemana = 0;
  totalMes = 0;
  loading = false;
  visibleDialog = false;
  visibleError = false;
  error = false;
  ngOnInit(): void {
    this.loadData();
    this.expenseEventsService.expenseChanged$.subscribe(() => {
      this.loadData();
    })

  }

  openDialog(): void {
    this.visibleDialog = true;
  }

  closeDialog(): void {
    this.visibleDialog = false;
    this.visibleError = false;
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
  }


  deleteExpense(id: number): void {
    this.loading = true;
    this.expensesService.deleteExpense(id).subscribe({
      next: () => {
        this.expenseEventsService.notifyExpenseChanged();
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
        this.visibleError = true;

      },
      complete: () => {
        this.loading = false;
      }
    })
  }


  private loadData(): void {
    this.loading = true;

    forkJoin({
      expenses: this.expensesService.getExpenses(DateRangeType.THIS_MONTH),
      totalSemana: this.gastosService.getTotalGastado(DateRangeType.THIS_WEEK),
      totalMes: this.gastosService.getTotalGastado(DateRangeType.THIS_MONTH)
    }).subscribe({
      next: ({ expenses, totalSemana, totalMes }) => {
        this.expensesMovimientos = expenses;
        this.totalSemana = totalSemana;
        this.totalMes = totalMes;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
