import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendamentosService } from '../agendamentos.service';
import { PetsService } from '../../pets/pets.service';
import { Pet } from '../../pets/models/pet.model';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { NotificationService } from '../../core/services/notification.service';
import { Agendamento } from '../models/agendamento.model';

@Component({
  selector: 'app-agendamentos-form',
  templateUrl: './agendamentos-form.component.html',
  styleUrls: ['./agendamentos-form.component.scss']
})
export class AgendamentosFormComponent implements OnInit {
  form: FormGroup;
  pets: Pet[] = [];
  carregando = false;
  editando = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private agendamentosService: AgendamentosService,
    private petsService: PetsService,
    private router: Router,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      data: ['', Validators.required],
      hora: ['', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), this.horarioFuncionamentoValidator()]],
      petId: ['', Validators.required],
      status: ['PENDENTE'],
      observacoes: ['']
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarPets();

    if (this.id) {
      this.editando = true;
      this.carregarAgendamento();
    }
  }

  carregarPets(): void {
    this.petsService.listar().subscribe({
      next: (pets) => {
        this.pets = pets;
      },
      error: (error) => {
        this.errorHandler.handleError(error);
      }
    });
  }

  carregarAgendamento(): void {
    if (!this.id) return;

    this.carregando = true;
    this.agendamentosService.buscarPorId(this.id).subscribe({
      next: (agendamento) => {
        this.form.patchValue({
          data: new Date(agendamento.data),
          hora: agendamento.hora,
          petId: agendamento.pet.id,
          observacoes: agendamento.observacoes,
          status: agendamento.status
        });
        this.carregando = false;
      },
      error: (error) => {
        this.errorHandler.handleError(error);
        this.carregando = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.carregando = true;
      const agendamento: Agendamento = this.form.value;

      const operacao = this.editando
        ? this.agendamentosService.atualizar(this.id!, agendamento)
        : this.agendamentosService.criar(agendamento);

      operacao.subscribe({
        next: () => {
          this.notificationService.sucesso(
            `Agendamento ${this.editando ? 'atualizado' : 'criado'} com sucesso`
          );
          this.router.navigate(['/agendamentos']);
        },
        error: (error) => {
          this.errorHandler.handleError(error);
          this.carregando = false;
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/agendamentos']);
  }

  private horarioFuncionamentoValidator() {
    return (control: any) => {
      if (!control.value) return null;
      
      const [horas, minutos] = control.value.split(':').map(Number);
      const hora = horas + minutos / 60;
      
      if (hora < 8 || hora > 18) {
        return { horarioInvalido: true };
      }
      
      return null;
    };
  }

  getErrorMessage(campo: string): string {
    const control = this.form.get(campo);
    if (!control?.errors) return '';

    if (control.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (control.hasError('pattern')) {
      return 'Formato inválido. Use HH:mm';
    }

    if (control.hasError('horarioInvalido')) {
      return 'Horário fora do horário de funcionamento (8h às 18h)';
    }

    return '';
  }
} 