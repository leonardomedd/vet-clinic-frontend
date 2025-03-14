import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  nome: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    if (token && usuario) {
      this.currentUserSubject.next(JSON.parse(usuario));
    }
  }

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        const usuario: Usuario = {
          id: response.id,
          nome: response.nome,
          email: response.email,
          role: response.role
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.currentUserSubject.next(usuario);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuario(): Usuario | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  temPermissao(role: string | undefined): boolean {
    const usuario = this.getUsuario();
    if (!usuario || !usuario.role || !role) return false;

    const hierarquia: { [key: string]: number } = {
      'ADMIN': 3,
      'VETERINARIO': 2,
      'ATENDENTE': 1
    };

    const userRole = hierarquia[usuario.role] || 0;
    const requiredRole = hierarquia[role] || 0;

    return userRole >= requiredRole;
  }
}