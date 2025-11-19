import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [ConfirmDialogModule, ButtonModule, CommonModule, DialogModule],
  providers: [ConfirmationService],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  @Input() header: string = '';
  @Input() message: string = '';
  @Input() icon: string = '';
  @Input() visible: boolean = false;

  @Input() closeable: boolean = false;



  constructor() { }

  cerrarDialog() {
    this.visible = false;
  }
}
