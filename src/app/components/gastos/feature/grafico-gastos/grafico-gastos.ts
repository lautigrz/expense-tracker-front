import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TopCategory } from '../../interfaces/top-category';
import { GastosService } from '../../data-access/gastos-service';
import { DateRangeType } from '../../enums/date.range';
import { ExpenseEventsService } from '../../../form-gasto/data-access/expense-events.service';

@Component({
    selector: 'app-grafico-gastos',
    imports: [ChartModule, DecimalPipe],
    templateUrl: './grafico-gastos.html',
    styleUrl: './grafico-gastos.css',
})
export class GraficoGastos implements OnInit {
    data: any;
    options: any;
    variation: number = 0;
    platformId = inject(PLATFORM_ID);
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
        this.gastosService.getTopCategories(DateRangeType.THIS_MONTH).subscribe(data => {
            console.log(data)
            this.data = this.buildChartData(data);
            this.initChart();
        })
        this.gastosService.getVariation().subscribe(data => {
            this.variation = data;
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
