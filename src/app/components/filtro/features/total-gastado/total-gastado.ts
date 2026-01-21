import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-total-gastado',
  imports: [DecimalPipe],
  templateUrl: './total-gastado.html',
  styleUrl: './total-gastado.css',
})
export class TotalGastado {

  @Input() total = 0;
}
