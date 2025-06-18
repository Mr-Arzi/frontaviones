import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Avion } from '../../models/avion';
import { AvionService } from '../../services/avion.service';
import { StorageService } from '../../services/storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-avion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-avion.component.html',
  styleUrl: './new-avion.component.css'
})
export class NewAvionComponent {
  avion: Avion = {
    id: 0,
    nombre: '',
    modelo: '',
    urlFoto: '',
    postedBy: '' // se asigna desde el token
  };

  mensaje = '';
  error = '';

  constructor(
    private avionService: AvionService,
    private storage: StorageService,
    private router: Router
  ) {}

publicar() {
  if (!this.avion.nombre || !this.avion.modelo || !this.avion.urlFoto) {
    this.error = 'Todos los campos son obligatorios.';
    return;
  }

  this.avion.postedBy = this.storage.getSession('user') || '';

  this.avionService.createAvion(this.avion).subscribe({
    next: () => {
      this.mensaje = 'Avión publicado con éxito.';
      setTimeout(() => this.router.navigate(['/home']), 1500);
    },
    error: err => {
      this.error = 'Error al publicar.';
      console.error(err);
    }
  });
}
}
