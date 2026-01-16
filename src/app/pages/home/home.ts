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
import { dashboardPageAnimation } from './home.animations';
import { Dialog } from 'primeng/dialog';
import { FormGastos } from "../../components/form-gasto/form-gastos/form-gastos";
import { ExpenseEventsService } from '../../components/form-gasto/data-access/expense-events.service';
import { forkJoin } from 'rxjs';
import { Loading } from "../../shared/ui/loading/loading";

@Component({
  selector: 'app-home',
  imports: [GraficoGastos, TotalGastos, Nav, Movimientos, DecimalPipe, Dialog, FormGastos, Loading],
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
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  private loadData(): void {
    this.loading = true;

    forkJoin({
      expenses: this.expensesService.getExpenses(),
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
