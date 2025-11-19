import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-grafico-gastos',
  imports: [ChartModule],
  templateUrl: './grafico-gastos.html',
  styleUrl: './grafico-gastos.css',
})
export class GraficoGastos implements OnInit{
  data: any;
    options: any;

    platformId = inject(PLATFORM_ID);

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');

            this.data = {
                labels: ['Aaa', 'B', 'C'],
                datasets: [
                    {
                        data: [200, 50, 100],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--p-cyan-500'),
                            documentStyle.getPropertyValue('--p-orange-500'),
                            documentStyle.getPropertyValue('--p-gray-500')
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--p-cyan-400'),
                            documentStyle.getPropertyValue('--p-orange-400'),
                            documentStyle.getPropertyValue('--p-gray-400')
                        ]
                    }
                ]
            };

            this.options = {
                cutout: '60%',
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                }
            };

            this.cd.markForCheck();
        }
    }
}
