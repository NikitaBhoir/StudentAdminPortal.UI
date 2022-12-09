import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };

  gendersList: Gender[] = [];

  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService // private snackbar: MatSnackBar, //  private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id'); // retrives param value from route and assign it to variable

      if (this.studentId) {
        this.studentService.getStudent(this.studentId).subscribe(
          (successResponse) => {
            console.log('successResponse', successResponse.data);
            this.student = successResponse.data;
          },
          (errorResponse) => {
            console.log('errorResponse', errorResponse);
          }
        );

        this.genderService.getGenders().subscribe(
          (successResponse) => {
            console.log('successResponse-Genders', successResponse.data);
            this.gendersList = successResponse.data;
          },
          (errorResponse) => {
            console.log('errorResponse', errorResponse);
          }
        );
      }
    });
  }
}
