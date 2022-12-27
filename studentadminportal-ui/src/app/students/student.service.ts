import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddStudentRequest } from '../models/api-models/add-student-request-model';
import {
  StudentList,
  StudentDetail,
  Student,
} from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseApiUrl = environment.apiUrl; // https://localhost:5000/api/v3/Student/all
  constructor(private httpclient: HttpClient) {}
  getStudents(): Observable<StudentList> {
    return this.httpclient.get<StudentList>(this.baseApiUrl + '/Student/all');
  }

  getStudent(studentId: string): Observable<StudentDetail> {
    return this.httpclient.get<StudentDetail>(
      this.baseApiUrl + '/Student/' + studentId
    );
  }
  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };

    return this.httpclient.post<Student>(
      this.baseApiUrl + '/Student/Add',
      addStudentRequest
    );
  }
}
