import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avion } from '../models/avion';
import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AvionService {
  private apiURL = 'https://aviones3.onrender.com/api/avion/';

  constructor(private http: HttpClient, private storage: StorageService) {}

 getAviones(): Observable<Avion[]> {
  const token = this.storage.getSession('token') || '';
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.get<Avion[]>(this.apiURL + 'all', { headers });
}



  getAvionesByUser(username: string): Observable<Avion[]> {
  return this.getAviones().pipe(
    map((aviones) => (Array.isArray(aviones) ? aviones : []).filter((a) => a.postedBy === username))
  );
}

    createAvion(avion: Avion): Observable<any> {
  const token = this.storage.getSession('token') || '';
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  console.log('TOKEN ENVIADO:', token); // 👈 para verificar

  return this.http.post(this.apiURL + 'create', avion, { headers });
}



}
