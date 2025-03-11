import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TutoresService, Tutor } from '../tutores.service';

@Component({
  selector: 'app-tutores-list',
  templateUrl: './tutores-list.component.html',
  styleUrls: ['./tutores-list.component.scss']
})
export class TutoresListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'telefone', 'acoes'];
  dataSource: Tutor[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tutoresService: TutoresService
  ) { }

  ngOnInit(): void {
    this.carregarTutores();
  }

  carregarTutores(): void {
    this.tutoresService.listar().subscribe({
      next: (tutores) => {
        this.dataSource = tutores;
      },
      error: (erro) => {
        console.error('Erro ao carregar tutores:', erro);
        this.snackBar.open('Erro ao carregar tutores', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  novoTutor(): void {
    this.router.navigate(['/tutores/novo']);
  }

  editarTutor(id: number): void {
    this.router.navigate(['/tutores/editar', id]);
  }

  excluirTutor(id: number): void {
    if (confirm('Tem certeza que deseja excluir este tutor?')) {
      this.tutoresService.excluir(id).subscribe({
        next: () => {
          this.snackBar.open('Tutor excluído com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.carregarTutores();
        },
        error: (erro) => {
          console.error('Erro ao excluir tutor:', erro);
          this.snackBar.open('Erro ao excluir tutor', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }
} 