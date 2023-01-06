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
  header: string | undefined = '';
  displayProfileImageUrl = '';
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
  isNewStudent = false;
  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService // private snackbar: MatSnackBar, //  private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id'); // retrives param value from route and assign it to variable

      if (this.studentId) {
        // if route contains add then new student functionality
        if (this.studentId.toLowerCase() === 'Add'.toLowerCase()) {
          this.isNewStudent = true;
          this.header = 'Add New Student';
          this.setImage();
        } else {
          // -> Existing Student Functionality
          this.isNewStudent = false;
          this.header = 'Edit Student';
        }
        //else existing student functionality

        this.studentService.getStudent(this.studentId).subscribe(
          (successResponse) => {
            console.log('successResponse', successResponse.data);
            this.student = successResponse.data;
            // this.setImage();
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

  onAdd(): void {
    this.studentService.addStudent(this.student).subscribe(
      (successResponse) => {
        console.log('successResponse-Add', successResponse);
      },
      (errorResponse) => {
        console.log('errorResponse-Add', errorResponse);
      }
    );
  }

  private setImage() {
    if (this.student.profileImageUrl) {
      //then fetch the img by url
    } else {
      //display default img
      this.displayProfileImageUrl = '/assets/images/defaultUser.png'; // ../../../
      console.log('else part');
    }
    //
  }
}
