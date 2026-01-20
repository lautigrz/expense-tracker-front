import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseRequest } from '../interfaces/expense';
import { inject } from '@angular/core';
import { FormService } from '../data-access/form.service';
import { Category } from '../../movimientos/interfaces/category.interface';
import { ExpenseEventsService } from '../data-access/expense-events.service';
import { Expense } from '../../movimientos/interfaces/expense.interface';
import { SelectModule } from 'primeng/select';



@Component({
  selector: 'app-form-gastos',
  imports: [ReactiveFormsModule, FormsModule, SelectModule],
  templateUrl: './form-gastos.html',
  styleUrl: './form-gastos.css',
})
export class FormGastos implements OnInit {
  private formService = inject(FormService);
  private expenseEventsService = inject(ExpenseEventsService);

  categories: Category[] = []

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() expense?: ExpenseRequest | Expense;

  @Output() deleteExpense = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  @Output() loading = new EventEmitter<boolean>();

  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    if (this.mode === 'edit' && this.expense) {

      const expense = this.expense as Expense;

      this.form.patchValue({
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        category: expense.category.categoryName
      });

    }
  }

  initForm(): void {
    this.form = this.fb.group({
      description: [this.expense?.description || '', Validators.required],
      amount: [this.expense?.amount || 0, Validators.required],
      date: [
        this.expense?.date
          ? this.formatDateForInput(new Date(this.expense.date))
          : this.formatDateForInput(new Date()),
        Validators.required
      ],
      category: [this.expense?.category || '', Validators.required],
    });
    this.getCategories();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.mode === 'create') {
      this.addExpense();
    } else {
      this.editExpense();
    }
  }


  addExpense(): void {
    const expense: ExpenseRequest = {
      ...this.expense,
      ...this.form.value
    };

    this.formService.addExpense(expense).subscribe({
      next: () => {
        this.expenseEventsService.notifyExpenseChanged();
        this.loading.emit(true);
        this.form.reset({
          description: '',
          amount: null,
          date: this.formatDateForInput(new Date()),
          category: null
        });
        this.close.emit();
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading.emit(false);
      }
    });
  }

  editExpense(): void {
    const getExpense = this.expense as Expense;
    const expenseId = getExpense.id;

    const expenseRequest: ExpenseRequest = {
      ...this.expense,
      ...this.form.value
    };

    this.formService.editExpense(expenseId, expenseRequest).subscribe({
      next: () => {
        this.expenseEventsService.notifyExpenseChanged();
        this.loading.emit(true);
        this.close.emit();
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading.emit(false);
      }
    });
  }

  onDelete(): void {
    this.deleteExpense.emit();
  }

  onClose(): void {
    this.close.emit();
  }


  private getCategories(): void {
    this.formService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }


}
