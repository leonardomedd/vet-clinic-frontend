import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TutoresListComponent } from './tutores/tutores-list/tutores-list.component';
import { PetsListComponent } from './pets/pets-list/pets-list.component';
import { AgendamentosListComponent } from './agendamentos/agendamentos-list/agendamentos-list.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tutores', component: TutoresListComponent, canActivate: [AuthGuard] },
  { path: 'pets', component: PetsListComponent, canActivate: [AuthGuard] },
  { path: 'agendamentos', component: AgendamentosListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}