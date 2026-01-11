import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-icon',
  imports: [NgStyle],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  @Input() icon!: string;
  @Input() color!: string;
  @Input() backgroundColor!: string;

  ngOnChanges() {
    console.log('BG RAW:', this.backgroundColor);
    console.log('BG CLEAN:', this.backgroundColor?.trim());
  }
}
