import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-aluno-detalhes',
  templateUrl: './aluno-detalhes.component.html',
  styleUrls: ['./aluno-detalhes.component.css']
})
export class AlunoDetalhesComponent {
  aluno: any; // Defina o tipo apropriado para o objeto aluno, se possível

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.aluno = data;
  }
}
