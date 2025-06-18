import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvionService } from '../../services/avion.service';
import { Avion } from '../../models/avion';
import { CommonModule } from '@angular/common';
import { AvionCardComponent } from '../../components/avion-card/avion-card.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AvionCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username = '';
  aviones: Avion[] = [];

  constructor(
    private route: ActivatedRoute,
    private avionService: AvionService
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') || '';

    this.avionService.getAvionesByUser(this.username).subscribe({
      next: data => this.aviones = data,
      error: err => console.error(err)
    });
  }
}
