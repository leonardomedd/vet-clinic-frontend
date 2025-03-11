import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AgendamentosService } from '../agendamentos.service';
import { Agendamento } from '../models/agendamento.model';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { NotificationService } from '../../core/services/notification.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CalendarioComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  agendamentosFiltrados: Agendamento[] = [];
  dataSelecionada: Date = new Date();
  carregando = false;

  constructor(
    private agendamentosService: AgendamentosService,
    private errorHandler: ErrorHandlerService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  carregarAgendamentos(): void {
    this.carregando = true;
    this.agendamentosService.listar().subscribe({
      next: (agendamentos) => {
        this.agendamentos = agendamentos;
        this.filtrarAgendamentosPorData(this.dataSelecionada);
        this.carregando = false;
      },
      error: (error) => {
        this.errorHandler.handleError(error);
        this.carregando = false;
      }
    });
  }

  selecionarData(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      this.dataSelecionada = event.value;
      this.filtrarAgendamentosPorData(this.dataSelecionada);
    }
  }

  private filtrarAgendamentosPorData(data: Date | null): void {
    if (!data) {
      this.agendamentosFiltrados = [];
      return;
    }

    this.agendamentosFiltrados = this.agendamentos.filter(agendamento => {
      const dataAgendamento = new Date(agendamento.data);
      return dataAgendamento.toDateString() === data.toDateString();
    });
  }

  dateClass = (date: Date): string => {
    const temAgendamento = this.agendamentos.some(agendamento => {
      const dataAgendamento = new Date(agendamento.data);
      return dataAgendamento.toDateString() === date.toDateString();
    });

    return temAgendamento ? 'data-com-agendamento' : '';
  };

  getStatusClass(status: string): string {
    switch (status) {
      case 'CONFIRMADO':
        return 'text-green-600';
      case 'PENDENTE':
        return 'text-yellow-600';
      case 'CANCELADO':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  atualizarStatus(id: number, novoStatus: string): void {
    this.agendamentosService.atualizarStatus(id, novoStatus as Agendamento['status']).subscribe({
      next: () => {
        this.notificationService.sucesso('Status atualizado com sucesso');
        this.carregarAgendamentos();
      },
      error: (error) => {
        this.errorHandler.handleError(error);
      }
    });
  }
} 