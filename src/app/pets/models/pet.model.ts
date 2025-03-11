import { Tutor } from '../../tutores/models/tutor.model';

export interface Pet {
  id?: number;
  nome: string;
  tipo: string;
  especie: string;
  raca: string;
  idade: number;
  dataNascimento: Date;
  tutor: Tutor;
} 