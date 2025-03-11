import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PetsService, Pet } from '../pets.service';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'tipo', 'raca', 'idade', 'tutor', 'acoes'];
  dataSource: Pet[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private petsService: PetsService
  ) { }

  ngOnInit(): void {
    this.carregarPets();
  }

  carregarPets(): void {
    this.petsService.listar().subscribe({
      next: (pets) => {
        this.dataSource = pets;
      },
      error: (erro) => {
        console.error('Erro ao carregar pets:', erro);
        this.snackBar.open('Erro ao carregar pets', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  novoPet(): void {
    this.router.navigate(['/pets/novo']);
  }

  editarPet(id: number): void {
    this.router.navigate(['/pets/editar', id]);
  }

  excluirPet(id: number): void {
    if (confirm('Tem certeza que deseja excluir este pet?')) {
      this.petsService.excluir(id).subscribe({
        next: () => {
          this.snackBar.open('Pet excluído com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.carregarPets();
        },
        error: (erro) => {
          console.error('Erro ao excluir pet:', erro);
          this.snackBar.open('Erro ao excluir pet', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }
} 