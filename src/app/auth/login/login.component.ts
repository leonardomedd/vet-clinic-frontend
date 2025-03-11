import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.authService.login(this.form.value.email, this.form.value.senha)
        .subscribe({
          next: () => {
            this.notificationService.sucesso('Login realizado com sucesso!');
            this.router.navigate(['/tutores']);
          },
          error: (erro) => {
            console.error('Erro ao fazer login:', erro);
            this.notificationService.erro('Email ou senha inválidos');
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    }
  }
} 