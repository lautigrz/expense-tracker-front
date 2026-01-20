import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FiltroService } from '../../data-acess/filtro.service';
import { Category } from '../../../movimientos/interfaces/category.interface';
import { CapitalizePipe } from "../../../../shared/pipe/capitalize/capitalize-pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-filters',
  imports: [CapitalizePipe, FormsModule],
  templateUrl: './expense-filters.html',
  styleUrl: './expense-filters.css',
})
export class ExpenseFilters implements OnInit, OnChanges {

  private filtroService = inject(FiltroService);
  categories: Category[] = [];
  activeFilter: string = "LAST_7_DAYS";
  activeCategory: string = "";

  @Input() cleanFechas!: number;
  @Output() fechasCleaned = new EventEmitter<void>();

  @Output() selectedFilter = new EventEmitter<string>();
  @Output() selectedCategory = new EventEmitter<string>();
  @Output() selectedDateRange = new EventEmitter<string[]>();

  fechas: string[] = ["", ""];

  ngOnInit(): void {
    this.filtroService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cleanFechas']) {
      this.limpiarFechas();
    }
  }

  limpiarFechas(): void {
    this.fechas = ["", ""];
    this.fechasCleaned.emit();
  }


  selectFilter(filter: string) {

    this.activeFilter = filter;
    this.selectedFilter.emit(filter);

  }

  selectCategory(category: string) {
    if (this.activeCategory === category) {
      this.activeCategory = "";
      this.selectedCategory.emit("");
      return;
    }
    this.activeCategory = category;
    this.selectedCategory.emit(category);
  }

  selectFechaInicio(dateRange: string) {
    this.fechas[0] = dateRange;
  }

  selectFechaFin(dateRange: string) {
    this.fechas[1] = dateRange;

    if (this.fechas.length === 2 && this.verificarFechas()) {
      this.activeFilter = "";
      this.selectedDateRange.emit(this.fechas);
    }
  }


  private verificarFechas(): boolean {
    const fechaInicio = this.fechas[0];
    const fechaFin = this.fechas[1];

    if (fechaInicio > fechaFin) {
      return false;
    }
    return true;
  }
}
