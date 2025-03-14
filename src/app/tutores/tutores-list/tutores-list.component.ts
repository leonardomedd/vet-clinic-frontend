import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutores-list',
  templateUrl: './tutores-list.component.html',
  styleUrls: ['./tutores-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TutoresListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'telefone', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarTutores();
  }

  carregarTutores(): void {
  }

  novoTutor(): void {
    this.router.navigate(['/tutores/novo']);
  }

  editarTutor(id: number): void {
    this.router.navigate([`/tutores/editar/${id}`]);
  }

  excluirTutor(id: number): void {
  }
}