import { Component, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpService } from '../../http.service';
import { IStudent } from '../../student';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginator,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  httpService = inject(HttpService);
  displayedColumns: string[] = ['name', 'rollNumber', 'class', 'age'];
  dataSource = new MatTableDataSource<IStudent>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit() {
    this.httpService.getStudents().subscribe((result) => {
      console.log(result);
      this.dataSource.data = result;
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search: string = '';
  applyFilter(value: any) {
    this.dataSource.filter = this.search;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
