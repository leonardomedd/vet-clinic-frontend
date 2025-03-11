import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentosListComponent } from './agendamentos-list/agendamentos-list.component';
import { AgendamentosFormComponent } from './agendamentos-form/agendamentos-form.component';
import { CalendarioComponent } from './calendario/calendario.component';

const routes: Routes = [
  { path: '', component: AgendamentosListComponent },
  { path: 'novo', component: AgendamentosFormComponent },
  { path: ':id/editar', component: AgendamentosFormComponent },
  { path: 'calendario', component: CalendarioComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgendamentosRoutingModule { } 