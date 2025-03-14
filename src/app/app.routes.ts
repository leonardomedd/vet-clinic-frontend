import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TutoresListComponent } from './tutores/tutores-list/tutores-list.component';
import { PetsListComponent } from './pets/pets-list/pets-list.component';
import { AgendamentosListComponent } from './agendamentos/agendamentos-list/agendamentos-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tutores', component: TutoresListComponent, canActivate: [authGuard] },
  { path: 'pets', component: PetsListComponent, canActivate: [authGuard] },
  { path: 'agendamentos', component: AgendamentosListComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];