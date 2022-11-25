import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { matTabsAnimations } from '@angular/material/tabs';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  studentsUI: Student[] = [];
  DisplayedColumns: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'mobile',
    'gender',
  ];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';
  constructor(private studentService: StudentService) {}
  ngOnInit(): void {
    // fetch student list

    this.studentService.getStudents().subscribe(
      (successRespone) => {
        console.log('successRespone:', successRespone.data);
        this.studentsUI = successRespone.data;
        this.dataSource = new MatTableDataSource<Student>(this.studentsUI); // fill datasource with list of strudents
        if (this.matPaginator) this.dataSource.paginator = this.matPaginator;
        if (this.matSort) this.dataSource.sort = this.matSort;
      },
      (errorResponse) => {
        console.log('errorResponse', errorResponse);
      }
    );
    //throw new Error('Method not implemented.');
  }

  filterStudents() {
    this.dataSource.filter = this.filterString.toLowerCase();
  }
}
