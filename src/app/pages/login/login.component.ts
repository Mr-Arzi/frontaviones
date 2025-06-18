import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../../models/user/credentials';
import { Token } from '../../models/user/token';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  callLogin() {
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Usuario y contraseña requeridos';
      return;
    }

    const credentials = new Credentials();
    credentials.username = this.username;
    credentials.password = this.password;

    this.userService.postLogin(credentials).subscribe({
      next: (token: Token) => {
        this.storageService.setSession('token', token.accessToken);
        this.storageService.setSession('user', this.username);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas';
        console.error('Error en login:', err);
      },
    });
  }
}
