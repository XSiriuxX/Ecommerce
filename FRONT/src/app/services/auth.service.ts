import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  API_URL: string = `${environment.API_URL}/user`;
  private token: string = '';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.API_URL}/register`, user).pipe(
      tap((res) => {
        this.saveToken(res.accessToken, res.expiresIn, res.id);
      })
    );
  }

  logIn(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.API_URL}/login`, user).pipe(
      tap((res) => {
        this.saveToken(res.accessToken, res.expiresIn, res.id);
      })
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('ACCESS_TOKEN');
  }

  logOut() {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    localStorage.removeItem('ID');
  }

  private saveToken(token: string, expiresIn: string, id: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    localStorage.setItem('ID', id);
    this.token = token;
  }
}
