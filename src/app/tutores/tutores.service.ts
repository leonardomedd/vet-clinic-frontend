import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Tutor {
  id?: number;
  nome: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class TutoresService {
  private apiUrl = `${environment.apiUrl}/tutores`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.apiUrl}/${id}`);
  }

  criar(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(this.apiUrl, tutor);
  }

  atualizar(id: number, tutor: Tutor): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.apiUrl}/${id}`, tutor);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 