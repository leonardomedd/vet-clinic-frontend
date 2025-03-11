import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Agendamento } from './models/agendamento.model';
import { ErrorHandlerService } from '../core/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {
  private apiUrl = `${environment.apiUrl}/agendamentos`;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  listar(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.apiUrl}/${id}`);
  }

  criar(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.apiUrl, agendamento);
  }

  atualizar(id: number, agendamento: Agendamento): Observable<Agendamento> {
    return this.http.put<Agendamento>(`${this.apiUrl}/${id}`, agendamento);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listarPorData(data: Date): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/data/${data.toISOString()}`);
  }

  listarPorPet(petId: number): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/pet/${petId}`);
  }

  listarPorTutor(tutorId: number): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/tutor/${tutorId}`);
  }

  atualizarStatus(id: number, status: Agendamento['status']): Observable<Agendamento> {
    return this.http.patch<Agendamento>(`${this.apiUrl}/${id}/status`, { status });
  }
} 