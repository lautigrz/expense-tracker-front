import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-gastado',
  imports: [],
  templateUrl: './total-gastado.html',
  styleUrl: './total-gastado.css',
})
export class TotalGastado {

  @Input() total = 0;
}
