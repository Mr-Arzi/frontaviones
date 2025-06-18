import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { Reaction } from '../models/reaction';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private apiURL = 'https://aviones3.onrender.com/api/reactions';

  constructor(private http: HttpClient, private storage: StorageService) {}

  postReaction(reaction: Reaction): Observable<any> {
    const token = this.storage.getSession('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(`${this.apiURL}/create`, reaction, { headers });
  }

  getReactionsByAvion(avionId: number): Observable<any[]> {
    const token = this.storage.getSession('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any[]>(`${this.apiURL}/most-voted/${avionId}`, { headers });
  }
}
