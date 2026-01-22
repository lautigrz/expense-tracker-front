import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-gastos',
  imports: [],
  templateUrl: './total-gastos.html',
  styleUrl: './total-gastos.css',
})
export class TotalGastos {

  @Input() title = ""
  @Input() totalGastado = "";
}
