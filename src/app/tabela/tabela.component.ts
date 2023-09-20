import {Component, ViewChild, ElementRef} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { MatDialog } from '@angular/material/dialog';
import { AlunoDetalhesComponent } from '../aluno-detalhes/aluno-detalhes.component';

export interface StudentData {
  matricula: number;
  aluno: string;
  curso: string;
  nota: number;
}

const ELEMENT_DATA: StudentData[] = [
  { matricula: 1, aluno: 'João', curso: 'Matemática', nota: 8.5 },
  { matricula: 2, aluno: 'Maria', curso: 'Física', nota: 7.2 },
  { matricula: 3, aluno: 'Pedro', curso: 'Química', nota: 9.0 },
  { matricula: 4, aluno: 'Ana', curso: 'Biologia', nota: 6.8 },
  { matricula: 5, aluno: 'Lucas', curso: 'História', nota: 7.5 },
  { matricula: 6, aluno: 'Mariana', curso: 'Geografia', nota: 8.2 },
  { matricula: 7, aluno: 'Carlos', curso: 'Inglês', nota: 9.5 },
  { matricula: 8, aluno: 'Isabela', curso: 'Artes', nota: 8.0 },
  { matricula: 9, aluno: 'Rafael', curso: 'Educação Física', nota: 7.7 },
  { matricula: 10, aluno: 'Larissa', curso: 'História', nota: 7.9 },
  { matricula: 11, aluno: 'Anderson', curso: 'Matemática', nota: 8.3 },
  { matricula: 12, aluno: 'Juliana', curso: 'Inglês', nota: 9.1 },
  { matricula: 13, aluno: 'Felipe', curso: 'Biologia', nota: 6.5 },
  { matricula: 14, aluno: 'Cristina', curso: 'Química', nota: 8.8 },
  { matricula: 15, aluno: 'Marcos', curso: 'Física', nota: 7.0 },
  { matricula: 16, aluno: 'Tatiana', curso: 'Educação Física', nota: 8.7 },
  { matricula: 17, aluno: 'Rodrigo', curso: 'Geografia', nota: 7.4 },
  { matricula: 18, aluno: 'Camila', curso: 'Artes', nota: 8.4 },
  { matricula: 19, aluno: 'Antônio', curso: 'História', nota: 7.3 },
  { matricula: 20, aluno: 'Amanda', curso: 'Matemática', nota: 8.6 },
  { matricula: 21, aluno: 'Fernanda', curso: 'Biologia', nota: 6.3 },
  { matricula: 22, aluno: 'Renato', curso: 'Física', nota: 7.8 },
];

@Component({
  selector: 'app-tabela',
  styleUrls: ['./tabela.component.css'],
  templateUrl: './tabela.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class TabelaComponent  {
  selectedRowIndex: number = -1; // Inicialmente, nenhum índice de linha está selecionado
    onRowHover(index: number) {
    // Define o índice da linha quando o mouse entra ou sai da linha
    this.selectedRowIndex = index;
  } 

  displayedColumns: string[] = ['matricula', 'aluno', 'curso', 'nota'];
  dataSource = new MatTableDataSource<StudentData>(ELEMENT_DATA);

  @ViewChild('matTable', { static: false }) matTable: ElementRef;
  @ViewChild(MatTable) table: MatTable<StudentData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog) { // Injete o MatDialog no construtor
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.data.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.data.pop();
    this.table.renderRows();
  }

  exportToPDF() {
    const doc = new jspdf.jsPDF();
    const content = this.matTable.nativeElement;

    html2canvas(content).then(canvas => {
      const imageData = canvas.toDataURL('image/png');
      const imgWidth = 210; // Largura da página em mm (A4)
      const pageHeight = 297; // Altura da página em mm (A4)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save('boletim.pdf');
    });
  }

  abrirDetalhesAluno(aluno: StudentData): void {
    const dialogRef = this.dialog.open(AlunoDetalhesComponent, {
      width: '300px',
      data: aluno,
    });

    // Defina o índice da linha selecionada para o índice da linha clicada
    this.selectedRowIndex = this.dataSource.data.indexOf(aluno);
  }

}