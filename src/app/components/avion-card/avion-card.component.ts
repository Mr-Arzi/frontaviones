import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avion } from '../../models/avion';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-avion-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './avion-card.component.html',
  styleUrl: './avion-card.component.css'
})
export class AvionCardComponent {
  @Input() avion!: Avion;
}
