import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../../models/user/credentials';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = ''; // ✅ AÑADIDO
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  callRegister() {
    if (!this.username.trim() || !this.password.trim() || !this.email.trim()) {
      this.errorMessage = 'Todos los campos son obligatorios';
      this.successMessage = '';
      return;
    }

    const credentials = new Credentials();
    credentials.username = this.username;
    credentials.email = this.email; // ✅ AÑADIDO
    credentials.password = this.password;

    this.userService.postRegister(credentials).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso. Puedes iniciar sesión.';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar.';
        this.successMessage = '';
        console.error('Error en registro:', err);
      }
    });
  }
}

