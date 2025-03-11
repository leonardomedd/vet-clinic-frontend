import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private usuarioSubject = new BehaviorSubject<Usuario | null>(this.getUsuarioDoStorage());

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(usuario => {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuarioSubject.next(usuario);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }

  getUsuarioLogado(): Usuario | null {
    return this.usuarioSubject.value;
  }

  private getUsuarioDoStorage(): Usuario | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  getToken(): string | null {
    const usuario = this.getUsuarioLogado();
    return usuario ? usuario.token : null;
  }
} 