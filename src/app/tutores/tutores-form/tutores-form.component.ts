import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TutoresService, Tutor } from '../tutores.service';

@Component({
  selector: 'app-tutores-form',
  templateUrl: './tutores-form.component.html',
  styleUrls: ['./tutores-form.component.scss']
})
export class TutoresFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  tutorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private tutoresService: TutoresService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]]
    });
  }

  ngOnInit(): void {
    this.tutorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.tutorId) {
      this.isEditMode = true;
      this.carregarTutor(this.tutorId);
    }
  }

  carregarTutor(id: number): void {
    this.tutoresService.obterPorId(id).subscribe({
      next: (tutor) => {
        this.form.patchValue(tutor);
      },
      error: (erro) => {
        console.error('Erro ao carregar tutor:', erro);
        this.snackBar.open('Erro ao carregar tutor', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const tutor: Tutor = this.form.value;
      const operacao = this.isEditMode
        ? this.tutoresService.atualizar(this.tutorId!, tutor)
        : this.tutoresService.criar(tutor);

      operacao.subscribe({
        next: () => {
          const message = this.isEditMode ? 'Tutor atualizado com sucesso!' : 'Tutor cadastrado com sucesso!';
          this.snackBar.open(message, 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/tutores']);
        },
        error: (erro) => {
          console.error('Erro ao salvar tutor:', erro);
          this.snackBar.open('Erro ao salvar tutor', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/tutores']);
  }
} 