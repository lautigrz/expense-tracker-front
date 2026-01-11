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

@Component({
  selector: 'app-home',
  imports: [GraficoGastos, TotalGastos, Nav, Movimientos, DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private expensesService = inject(ExpensesService)
  private gastosService = inject(GastosService)

  expensesMovimientos: Expense[] = []
  totalSemana = 0;
  totalMes = 0;

  ngOnInit(): void {
    this.expensesService.getExpenses().subscribe((expenses) => {

      this.expensesMovimientos = expenses

    })

    this.gastosService.getTotalGastado(DateRangeType.THIS_WEEK).subscribe((total) => {
      this.totalSemana = total
    })

    this.gastosService.getTotalGastado(DateRangeType.THIS_MONTH).subscribe((total) => {
      this.totalMes = total
    })

  }
}
