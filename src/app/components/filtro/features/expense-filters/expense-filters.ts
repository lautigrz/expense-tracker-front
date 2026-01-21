import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FiltroService } from '../../data-acess/filtro.service';
import { Category } from '../../../movimientos/interfaces/category.interface';
import { CapitalizePipe } from "../../../../shared/pipe/capitalize/capitalize-pipe";
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-expense-filters',
  imports: [CapitalizePipe, FormsModule, SelectModule],
  templateUrl: './expense-filters.html',
  styleUrl: './expense-filters.css',
})
export class ExpenseFilters implements OnInit, OnChanges {

  private filtroService = inject(FiltroService);
  categories: Category[] = [];
  categoriesInSelect: Category[] = [];

  visibleCategories: Category[] = [];
  hiddenCategories: Category[] = [];

  readonly DESKTOP_VISIBLE = 7;
  readonly MOBILE_VISIBLE = 2;

  isMobile = false;

  activeFilter: string = "LAST_7_DAYS";
  activeCategory: string = "";
  selectCategoryValue: string | null = null;
  @Input() cleanFechas!: number;
  @Output() fechasCleaned = new EventEmitter<void>();

  @Output() selectedFilter = new EventEmitter<string>();
  @Output() selectedCategory = new EventEmitter<string>();
  @Output() selectedDateRange = new EventEmitter<string[]>();

  fechas: string[] = ["", ""];

  ngOnInit(): void {
    this.checkViewport();

    this.filtroService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.updateCategories();
    });

    window.addEventListener('resize', () => {
      this.checkViewport();
      this.updateCategories();
    });
  }

  checkViewport(): void {
    this.isMobile = window.innerWidth <= 768;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cleanFechas']) {
      this.limpiarFechas();
    }
  }

  updateCategories(): void {
    const visibleCount = this.isMobile
      ? this.MOBILE_VISIBLE
      : this.DESKTOP_VISIBLE;

    this.visibleCategories = this.categories.slice(0, visibleCount);
    this.hiddenCategories = this.categories.slice(visibleCount);
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
    this.selectCategoryValue = null;
    this.activeCategory = category;
    this.selectedCategory.emit(category);
  }

  selectFechaInicio(dateRange: string) {
    this.fechas[0] = dateRange;

    if (this.verificarFechas()) {
      this.emitirFechas();
    }
  }

  selectFechaFin(dateRange: string) {
    this.fechas[1] = dateRange;

    if (this.verificarFechas()) {
      this.emitirFechas();
    }
  }



  onSelectChange(category: string): void {

    this.selectCategoryValue = category;
    this.activeCategory = category;
    this.selectedCategory.emit(category);
  }

  private emitirFechas(): void {
    this.activeFilter = "";
    this.selectedDateRange.emit(this.fechas);
  }

  private verificarFechas(): boolean {
    const fechaInicio = this.fechas[0];
    const fechaFin = this.fechas[1];

    if (fechaInicio === "" || fechaFin === "") {
      return false;
    }


    if (fechaInicio > fechaFin) {
      return false;
    }
    return true;
  }
}
