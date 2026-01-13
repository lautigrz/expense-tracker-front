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
@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, PasswordModule, Button, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const user: UserLogin = this.loginForm.value;
      this.authService.loginUser(user).subscribe({
        next: (data: UserResponse) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          console.log(err);
        }
      })

    }
  }
}
