import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ExpenseFilters } from "../../components/filtro/features/expense-filters/expense-filters";
import { Nav } from "../../shared/layout/nav/nav";
import { TotalGastado } from "../../components/filtro/features/total-gastado/total-gastado";
import { EmptyState } from "../../components/filtro/features/empty-state/empty-state";
import { Movimientos } from "../../components/movimientos/ultimos-movimientos/movimientos";
import { ExpensesService } from '../../components/movimientos/data-acces/expenses.service';
import { Expense } from '../../components/movimientos/interfaces/expense.interface';
import { GastosService } from '../../components/gastos/data-access/gastos-service';
import { DateRangeType } from '../../components/gastos/enums/date.range';
import { dashboardPageAnimation } from '../../shared/animations/init.animations';
import { sectionEnterAnimation } from '../../shared/animations/section.animation';
import { ExpenseEventsService } from '../../components/form-gasto/data-access/expense-events.service';
import { itemCascadeAnimation } from '../../shared/animations/item.animation';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-filtro',
  imports: [ExpenseFilters, Nav, TotalGastado, EmptyState, Movimientos],
  templateUrl: './filtro.html',
  styleUrl: './filtro.css',
  animations: [dashboardPageAnimation, sectionEnterAnimation, itemCascadeAnimation]
})
export class Filtro implements OnInit {

  private expensesService = inject(ExpensesService)
  private expenseEventsService = inject(ExpenseEventsService)
  private gastosService = inject(GastosService)
  expenses: Expense[] = []

  range = "LAST_7_DAYS";
  category = "";
  total = 0;
  fechas: string[] = [];
  cleanFechasSignal = 0;
  loading = true;

  ngOnInit(): void {
    this.loadData();
    this.expenseEventsService.expenseChanged$.subscribe(() => {
      this.loadData();
    })

  }

  loadData(): void {
    this.loading = true;
    forkJoin({
      expenses: this.expensesService.getExpenses(this.range, this.category, this.fechas),
      total: this.gastosService.getTotalGastado(this.range as DateRangeType, this.category, this.fechas)
    }).subscribe({
      next: ({ expenses, total }) => {
        this.expenses = expenses;
        this.total = total;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  setRange(range: string): void {
    this.range = range;
    this.fechas = [];
    this.cleanFechasSignal++;
    this.loadData();
  }

  setCategory(category: string): void {
    this.category = category;
    this.loadData();
  }

  setFechas(fechas: string[]): void {
    this.range = "";
    this.fechas = fechas;
    this.loadData();
  }



}
