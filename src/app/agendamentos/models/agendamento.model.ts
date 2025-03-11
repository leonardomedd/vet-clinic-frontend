import { Pet } from '../../pets/models/pet.model';

export interface Agendamento {
  id?: number;
  data: Date;
  hora: string;
  pet: Pet;
  motivo: string;
  observacoes?: string;
  status: AgendamentoStatus;
}

export enum AgendamentoStatus {
  AGENDADO = 'AGENDADO',
  CONFIRMADO = 'CONFIRMADO',
  CANCELADO = 'CANCELADO',
  CONCLUIDO = 'CONCLUIDO'
} 