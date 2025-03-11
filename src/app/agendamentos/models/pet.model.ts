import { Tutor } from './tutor.model';

export interface Pet {
  id: number;
  nome: string;
  tipo: string;
  tutor: Tutor;
} 