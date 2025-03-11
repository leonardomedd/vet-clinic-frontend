import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'tutores',
    loadChildren: () => import('./tutores/tutores.module').then(m => m.TutoresModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pets',
    loadChildren: () => import('./pets/pets.module').then(m => m.PetsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agendamentos',
    loadChildren: () => import('./agendamentos/agendamentos.module').then(m => m.AgendamentosModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
