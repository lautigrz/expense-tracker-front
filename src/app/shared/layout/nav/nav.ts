import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from "../../ui/button/button";

@Component({
  selector: 'app-nav',
  imports: [Button],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private router = inject(Router);
  @Output() addExpense = new EventEmitter<void>();


  get isFilterView(): boolean {
    return this.router.url.includes('/filtro');
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  onClickAddExpense(): void {
    this.addExpense.emit();
  }

  onClickFilter(): void {
    this.router.navigate(['/filtro']);
  }

}
