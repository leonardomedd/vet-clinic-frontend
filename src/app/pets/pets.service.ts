import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pet } from './models/pet.model';

export { Pet } from './models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private apiUrl = `${environment.apiUrl}/pets`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  criar(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  atualizar(id: number, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, pet);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 