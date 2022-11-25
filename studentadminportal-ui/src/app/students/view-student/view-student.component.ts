import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute // private readonly genderService: GenderService, // private snackbar: MatSnackBar,
  ) //  private router: Router
  {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id'); // retrives param value from route and assign it to variable

      if (this.studentId) {
        this.studentService.getStudent(this.studentId).subscribe(
          (successResponse) => {
            console.log('successResponse', successResponse.data);
          },
          (errorResponse) => {
            console.log('errorResponse', errorResponse);
          }
        );
      }
    });
  }
}
