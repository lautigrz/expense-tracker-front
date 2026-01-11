import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {

  icon = input<string>();
  texto = input<string>();
  label = input<string>();
  type = input<string>();
  placeholder = input<string>();
  value = input<string | number>();

 
}

