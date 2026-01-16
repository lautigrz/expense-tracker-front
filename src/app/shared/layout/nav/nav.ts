import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  @Output() addExpense = new EventEmitter<void>();

  onClickAddExpense(): void {
    this.addExpense.emit();
  }

}
