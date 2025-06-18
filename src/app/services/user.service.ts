import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/user/credentials';
import { Observable } from 'rxjs';
import { Token } from '../models/user/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = 'https://aviones3.onrender.com/api/auth/';

  constructor(private http: HttpClient) {}

  postLogin(credentials: Credentials): Observable<Token> {
    
  return this.http.post<Token>(this.apiURL + 'signin', credentials, {
    withCredentials: true
  });
}


  postRegister(credentials: Credentials): Observable<any> {
    return this.http.post(this.apiURL + 'signup', credentials);
  }
}
