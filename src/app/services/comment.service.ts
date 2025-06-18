import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiURL = 'https://aviones3.onrender.com/api/comentarios';

  constructor(private http: HttpClient, private storage: StorageService) {}

  getCommentsByAvion(id: number): Observable<any[]> {
    const token = this.storage.getSession('token') || '';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any[]>(`${this.apiURL}/get/${id}`, { headers });
  }

  postComment(avionId: number, contenido: string): Observable<any> {
    const token = this.storage.getSession('token') || '';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.apiURL}/create`, {
      contenido,
      avionId: avionId
    }, { headers });
  }
}
