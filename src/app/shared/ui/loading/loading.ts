import { Component, Input } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  imports: [ProgressSpinner],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {
  @Input() loading: boolean = false;
}
