import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvionService } from '../../services/avion.service';
import { CommentService } from '../../services/comment.service';
import { ReactionService } from '../../services/reaction.service';
import { Avion } from '../../models/avion';
import { Reaction } from '../../models/reaction';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  avion: Avion | null = null;
  comentarios: any[] = [];
  nuevoComentario: string = '';
  error = '';
  reacciones: any[] = [];
  reaccionesContadas: { [key: string]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private avionService: AvionService,
    private commentService: CommentService,
    private reactionService: ReactionService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.reactionService.getReactionsByAvion(id).subscribe({
      next: data => {
        this.reacciones = data;
        this.actualizarConteoReacciones();
      },
      error: err => console.error(err)
    });

    this.commentService.getCommentsByAvion(id).subscribe({
      next: data => this.comentarios = data,
      error: err => console.error(err)
    });
  }

  actualizarConteoReacciones() {
    this.reaccionesContadas = this.reacciones.reduce((acc, r) => {
      acc[r.tipo] = (acc[r.tipo] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  enviarComentario() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.nuevoComentario.trim()) {
      this.error = 'Comentario vacío.';
      return;
    }

    this.commentService.postComment(id, this.nuevoComentario).subscribe({
      next: () => {
        this.comentarios.push({
          contenido: this.nuevoComentario,
          autor: { username: 'Tú' }
        });
        this.nuevoComentario = '';
      },
      error: err => {
        console.error(err);
        this.error = 'Error al comentar';
      }
    });
  }

  enviarReaccion(tipo: string) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const nueva: Reaction = { tipo, avionId: id };

    this.reactionService.postReaction(nueva).subscribe({
      next: () => {
        this.reacciones.push({ tipo });
        this.actualizarConteoReacciones();
      },
      error: err => console.error(err)
    });
  }
}
