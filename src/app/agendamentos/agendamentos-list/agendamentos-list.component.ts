import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AgendamentosService } from '../agendamentos.service';
import { Agendamento } from '../models/agendamento.model';
import { NotificationService } from '../../core/services/notification.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
  selector: 'app-agendamentos-list',
  templateUrl: './agendamentos-list.component.html',
  styleUrls: ['./agendamentos-list.component.scss']
})
export class AgendamentosListComponent implements OnInit {
  displayedColumns: string[] = ['data', 'hora', 'pet', 'tutor', 'status', 'acoes'];
  dataSource!: MatTableDataSource<Agendamento>;
  carregando = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private agendamentosService: AgendamentosService,
    private router: Router,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService
  ) {
    this.dataSource = new MatTableDataSource<Agendamento>();
  }

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarAgendamentos(): void {
    this.carregando = true;
    this.agendamentosService.listar().subscribe({
      next: (agendamentos) => {
        this.dataSource.data = agendamentos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.carregando = false;
      },
      error: (error) => {
        this.errorHandler.handleError(error);
        this.carregando = false;
      }
    });
  }

  irParaCalendario(): void {
    this.router.navigate(['/agendamentos/calendario']);
  }

  irParaNovoAgendamento(): void {
    this.router.navigate(['/agendamentos/novo']);
  }

  editarAgendamento(id: number): void {
    this.router.navigate(['/agendamentos', id, 'editar']);
  }

  excluirAgendamento(id: number): void {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      this.agendamentosService.excluir(id).subscribe({
        next: () => {
          this.notificationService.sucesso('Agendamento excluído com sucesso');
          this.carregarAgendamentos();
        },
        error: (error) => {
          this.errorHandler.handleError(error);
        }
      });
    }
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
} 