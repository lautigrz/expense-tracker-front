import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-invalid',
  imports: [],
  templateUrl: './message-invalid.html',
  styleUrl: './message-invalid.css',
})
export class MessageInvalid {

  @Input() mensaje = "";
}
