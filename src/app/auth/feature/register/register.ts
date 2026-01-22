import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Button } from "../../../shared/ui/button/button";
import { Loading } from "../../../shared/ui/loading/loading";
import { UserRegisterRequest } from '../../interfaces/user-request';
import { AuthService } from '../../data-access/auth.service';
import { MessageInvalid } from "../../../shared/ui/message-invalid/message-invalid";

import { Router, RouterLink } from '@angular/router';
import { ConfirmDialog } from '../../../shared/ui/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-register',
  imports: [FormsModule, InputTextModule, PasswordModule,
    Button, Loading, ReactiveFormsModule, MessageInvalid, ConfirmDialog, RouterLink],
  providers: [],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm!: FormGroup;
  loading = false;
  mensajeError = "";
  dialogVisible = false;
  dialogHeader = '';
  dialogMessage = '';
  dialogIcon = '';
  private authService = inject(AuthService)
  private fb = inject(FormBuilder);
  private router = inject(Router);
  constructor() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });



  }


  onsubmit() {

    if (this.registerForm.valid) {
      this.loading = true;
      const user: UserRegisterRequest = this.registerForm.value;

      this.authService.registerUser(user).subscribe({
        next: (user) => {
          this.loading = false;
          this.dialogHeader = "Registro exitoso"
          this.dialogMessage = `¡Bienvenido, te has registrado correctamente!. Seras redirigido para iniciar sesion`
          this.dialogIcon = "check_circle"
          this.dialogVisible = true;

          setTimeout(() => {
            this.router.navigate([""]);
          }, 2000)
        },
        error: (err) => {
          this.loading = false;
          this.mensajeError = "Email o contraseña incorrecta. Intentelo de nuevo";

        }
      })

    }


  }
}

