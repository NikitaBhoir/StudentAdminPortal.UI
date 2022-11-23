import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  constructor(private studentService: StudentService) {}
  ngOnInit(): void {
    // fetch student list

    this.studentService.getStudents().subscribe(
      (SuccessRespone) => {
        console.log('SuccessRespone:', SuccessRespone.data);
      },
      (ErrorResponse) => {
        console.log('ErrorResponse', ErrorResponse);
      }
    );
    //throw new Error('Method not implemented.');
  }
}
