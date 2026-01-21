import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Button } from "../../../shared/ui/button/button";
import { RouterLink } from "@angular/router";
import { UserLogin } from '../../interfaces/user-request';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import { UserResponse } from '../../interfaces/user-response';
import { MessageInvalid } from "../../../shared/ui/message-invalid/message-invalid";
@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, PasswordModule, Button, RouterLink, MessageInvalid],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  loading = false;
  error = false;
  errorMessage = '';
  constructor() {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const user: UserLogin = this.loginForm.value;
      this.authService.loginUser(user).subscribe({
        next: (data: UserResponse) => {
          this.loading = false;
          localStorage.setItem('token', data.token);
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = 'Credenciales incorrectas, por favor intenta de nuevo'
        }
      })

    }
  }
}
