import { Component, input, Input } from '@angular/core';
import { Select } from 'primeng/select';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-select',
  imports: [Select],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class SelectComponent {
  icon = input<string>();
  texto = input<string>();
  label = input<string>();
  placeholder = input<string>();
  cities: City[] | undefined;

  selectedCity: City | undefined;

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }
}
