import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Auth,
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';

export interface Credential {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  API_URL: string = `${environment.API_URL}/user`;
  private token: string = '';
  private auth: Auth = inject(Auth);

  readonly authState$ = authState(this.auth);

  private signUpEmailandPassword(
    credential: Credential
  ): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  private logInEmailandPassword(credential: Credential) {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  //providers

  signInGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.callPopUp(provider);
  }

  signInFacebook(): Promise<UserCredential> {
    const provider = new FacebookAuthProvider();
    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    console.log(provider);

    try {
      const result = await signInWithPopup(this.auth, provider);

      return result;
    } catch (error: any) {
      console.log(error);

      return error;
    }
  }

  constructor(private http: HttpClient) {}

  register(user: User): Observable<JwtResponse> {
    this.signUpEmailandPassword(user);

    return this.http.post<JwtResponse>(`${this.API_URL}/register`, user).pipe(
      tap((res) => {
        this.saveToken(res.accessToken, res.expiresIn, res.id);
      })
    );
  }

  logIn(user: User): Observable<JwtResponse> {
    const res = this.logInEmailandPassword(user);
    console.log(res);

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
    location.reload();
  }

  private saveToken(token: string, expiresIn: string, id: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    localStorage.setItem('ID', id);
    this.token = token;
  }
}
