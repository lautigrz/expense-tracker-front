import { Component, effect, inject, input } from '@angular/core';
import { Input } from "../../../shared/ui/input/input";
import { SelectComponent } from "../../../shared/ui/select/select";
import { Button } from "../../../shared/ui/button/button";
import { Gasto } from '../interfaces/gasto.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-gasto',
  imports: [Input, SelectComponent, Button, ReactiveFormsModule],
  templateUrl: './add-gasto.html',
  styleUrl: './add-gasto.css',
})
export class AddGasto {
  private fb = inject(FormBuilder);
  gasto = input<Gasto | null>(null);

  form: FormGroup = this.fb.group({
    monto: [''],
    categoria: [''],
    fecha: [''],
    descripcion: ['']
  });

  constructor() {

    effect(() => {

      const g = this.gasto();

      if (g) {

        this.form.patchValue({
          monto: g.monto,
          categoria: g.categoria,
          fecha: g.fecha,
          descripcion: g.descripcion
        });
      }

    });
  }


}
