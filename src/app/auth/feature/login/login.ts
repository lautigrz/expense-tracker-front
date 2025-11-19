import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Button } from "../../../shared/ui/button/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [FormsModule, InputTextModule, PasswordModule, Button, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
