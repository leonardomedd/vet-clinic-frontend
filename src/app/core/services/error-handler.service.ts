import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  handleError(error: HttpErrorResponse): void {
    let mensagem = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';

    if (error.error instanceof ErrorEvent) {
      // Erro do cliente
      mensagem = 'Erro de conexão. Verifique sua internet e tente novamente.';
    } else {
      // Erro do servidor
      switch (error.status) {
        case 400:
          mensagem = this.getMensagemErro400(error);
          break;
        case 401:
          mensagem = 'Sua sessão expirou. Por favor, faça login novamente.';
          this.router.navigate(['/auth/login']);
          break;
        case 403:
          mensagem = 'Você não tem permissão para realizar esta operação.';
          break;
        case 404:
          mensagem = 'O recurso solicitado não foi encontrado.';
          break;
        case 409:
          mensagem = 'Já existe um registro com estas informações.';
          break;
        case 422:
          mensagem = this.getMensagemErro422(error);
          break;
        case 500:
          mensagem = 'Erro interno do servidor. Tente novamente mais tarde.';
          break;
        default:
          mensagem = `Erro ${error.status}: ${error.statusText}`;
      }
    }

    console.error('Erro:', error);
    this.notificationService.erro(mensagem);
  }

  private getMensagemErro400(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    }
    return 'Dados inválidos. Verifique as informações e tente novamente.';
  }

  private getMensagemErro422(error: HttpErrorResponse): string {
    if (error.error?.errors) {
      const erros = error.error.errors;
      if (Array.isArray(erros)) {
        return erros.map(e => e.message).join('\n');
      }
      return Object.values(erros).join('\n');
    }
    return 'Dados inválidos. Verifique as informações e tente novamente.';
  }
} 