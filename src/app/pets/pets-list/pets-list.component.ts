import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PetsListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'especie', 'raca', 'tutor', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarPets();
  }

  carregarPets(): void {
  }

  novoPet(): void {
    this.router.navigate(['/pets/novo']);
  }

  editarPet(id: number): void {
    this.router.navigate([`/pets/editar/${id}`]);
  }

  excluirPet(id: number): void {
  }
}