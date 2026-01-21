import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TopCategory } from '../../interfaces/top-category';
import { GastosService } from '../../data-access/gastos-service';
import { DateRangeType } from '../../enums/date.range';
import { ExpenseEventsService } from '../../../form-gasto/data-access/expense-events.service';
import { forkJoin } from 'rxjs';
import { EmptyState } from "../../../../shared/ui/empty-state/empty-state";

@Component({
    selector: 'app-grafico-gastos',
    imports: [ChartModule, DecimalPipe, EmptyState],
    templateUrl: './grafico-gastos.html',
    styleUrl: './grafico-gastos.css',
})
export class GraficoGastos implements OnInit {
    data: any;
    options: any;
    variation: number = 0;
    platformId = inject(PLATFORM_ID);
    dataEmpty = false;
    private gastosService = inject(GastosService)
    private expenseEventsService = inject(ExpenseEventsService)
    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.loadData();

        this.expenseEventsService.expenseChanged$.subscribe(() => {
            this.loadData();
        })
    }


    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');

            this.options = {
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        align: 'center',
                        labels: {
                            color: textColor,
                            usePointStyle: true,
                            pointStyle: 'circle'

                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context: any) => {
                                const value = context.raw || 0;
                                return ` $${value.toFixed(2)}`
                            }
                        }
                    }
                }
            };

            this.cd.markForCheck();
        }
    }

    getVariationColor(): string {
        if (this.variation < 0) {
            return 'improved';
        } else if (this.variation > 0) {
            return 'worsened';
        } else {
            return 'neutral';
        }
    }

    private loadData(): void {
        let topCategoriesLength = 0;

        forkJoin({
            topCategories: this.gastosService.getTopCategories(DateRangeType.THIS_MONTH),
            variation: this.gastosService.getVariation()
        }).subscribe({
            next: ({ topCategories, variation }) => {
                this.data = this.buildChartData(topCategories);
                this.initChart();
                this.variation = variation;
                topCategoriesLength = topCategories.length;
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.dataEmpty = topCategoriesLength === 0;
            }
        })
    }



    private buildChartData(categories: TopCategory[]) {

        return {
            labels: categories.map(category => category.category),
            datasets: [
                {
                    data: categories.map(category => category.categoryPrice),
                    backgroundColor: categories.map(category => category.colorCategory),
                    hoverBackgroundColor: categories.map(category => category.colorCategory)
                }
            ]
        };



    }
}
