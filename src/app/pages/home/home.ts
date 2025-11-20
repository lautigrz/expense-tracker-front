import { Component } from '@angular/core';
import { TotalGastos } from "../../components/gastos/feature/total-gastos/total-gastos";
import { GraficoGastos } from "../../components/gastos/feature/grafico-gastos/grafico-gastos";
import { Nav } from "../../shared/layout/nav/nav";

@Component({
  selector: 'app-home',
  imports: [TotalGastos, GraficoGastos, Nav],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
