import { Component } from '@angular/core';
import { Input } from "../../../shared/ui/input/input";
import { SelectComponent } from "../../../shared/ui/select/select";


@Component({
  selector: 'app-add-gasto',
  imports: [Input, SelectComponent],
  templateUrl: './add-gasto.html',
  styleUrl: './add-gasto.css',
})
export class AddGasto {
 
}
