import { Component, OnInit } from '@angular/core';
import { AvionService } from '../../services/avion.service';
import { Avion } from '../../models/avion';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AvionCardComponent } from '../../components/avion-card/avion-card.component';
import { StorageService } from '../../services/storage.service'; // 👈 importa tu servicio

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, AvionCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  aviones: Avion[] = [];
  error = '';
  loading = true;

  constructor(
    private avionService: AvionService,
    private storageService: StorageService // 👈 injéctalo aquí
  ) {}

  ngOnInit() {
    const token = this.storageService.getSession('token');
    if (token) {
      this.cargarAviones();
    }
  }

  cargarAviones() {
    this.avionService.getAviones().subscribe({
      next: (data) => {
        this.aviones = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar publicaciones';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  get isLogged(): boolean {
    return !!this.storageService.getSession('token');
  }
}
