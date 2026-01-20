import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {

  @Input() texto?: string;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() icon?: string;
  @Input() type?: string;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';


}
