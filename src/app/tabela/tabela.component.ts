import {Component, ViewChild} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

export interface StudentData {
  id: number;
  aluno: string;
  curso: string;
  nota: number;
}

const ELEMENT_DATA: StudentData[] = [
  { id: 1, aluno: 'João', curso: 'Matemática', nota: 8.5 },
  { id: 2, aluno: 'Maria', curso: 'Física', nota: 7.2 },
  { id: 3, aluno: 'Pedro', curso: 'Química', nota: 9.0 },
  { id: 4, aluno: 'Ana', curso: 'Biologia', nota: 6.8 },
  { id: 5, aluno: 'Lucas', curso: 'História', nota: 7.5 },
];

@Component({
  selector: 'app-tabela',
  styleUrls: ['./tabela.component.css'],
  templateUrl: './tabela.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class TabelaComponent  {
  displayedColumns: string[] = ['id', 'aluno', 'curso', 'nota'];
  dataSource = new MatTableDataSource<StudentData>(ELEMENT_DATA);

  @ViewChild(MatTable) table: MatTable<StudentData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
}
