import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaComponent } from './tabela/tabela.component';
import { AlunoDetalhesComponent } from './aluno-detalhes/aluno-detalhes.component';

const routes: Routes = [
  {path: "tabela",
  component: TabelaComponent},
  {path: "aluno-detalhes",
   component: AlunoDetalhesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
