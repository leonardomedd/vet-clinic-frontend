import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service'; // Caminho corrigido
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterOutlet]
})
export class AppComponent implements OnInit {
  usuario: any = null;
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.currentUser$.pipe(filter(user => user !== null)).subscribe((user: any) => {
      this.usuario = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.usuario = null;
  }
}