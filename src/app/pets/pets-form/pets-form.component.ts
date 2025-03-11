import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PetsService, Pet } from '../pets.service';
import { TutoresService, Tutor } from '../../tutores/tutores.service';

@Component({
  selector: 'app-pets-form',
  templateUrl: './pets-form.component.html',
  styleUrls: ['./pets-form.component.scss']
})
export class PetsFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  petId: number | null = null;
  tutores: Tutor[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private petsService: PetsService,
    private tutoresService: TutoresService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      raca: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(0)]],
      tutor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.petId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarTutores();
    
    if (this.petId) {
      this.isEditMode = true;
      this.carregarPet(this.petId);
    }
  }

  carregarTutores(): void {
    this.tutoresService.listar().subscribe({
      next: (tutores) => {
        this.tutores = tutores;
      },
      error: (erro) => {
        console.error('Erro ao carregar tutores:', erro);
        this.snackBar.open('Erro ao carregar tutores', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  carregarPet(id: number): void {
    this.petsService.obterPorId(id).subscribe({
      next: (pet) => {
        this.form.patchValue({
          nome: pet.nome,
          tipo: pet.tipo,
          raca: pet.raca,
          idade: pet.idade,
          tutor: pet.tutor.id
        });
      },
      error: (erro) => {
        console.error('Erro ao carregar pet:', erro);
        this.snackBar.open('Erro ao carregar pet', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const tutor = this.tutores.find(t => t.id === this.form.get('tutor')?.value);
      if (!tutor) {
        this.snackBar.open('Tutor não encontrado', 'Fechar', {
          duration: 3000
        });
        return;
      }

      const pet: Pet = {
        ...this.form.value,
        tutor: tutor
      };

      const operacao = this.isEditMode
        ? this.petsService.atualizar(this.petId!, pet)
        : this.petsService.criar(pet);

      operacao.subscribe({
        next: () => {
          const message = this.isEditMode ? 'Pet atualizado com sucesso!' : 'Pet cadastrado com sucesso!';
          this.snackBar.open(message, 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/pets']);
        },
        error: (erro) => {
          console.error('Erro ao salvar pet:', erro);
          this.snackBar.open('Erro ao salvar pet', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/pets']);
  }
} 