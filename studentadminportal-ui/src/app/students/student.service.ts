import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentList, StudentDetail } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseApiUrl = 'https://localhost:5000/api/v3'; // https://localhost:5000/api/v3/Student/all
  constructor(private httpclient: HttpClient) {}
  getStudents(): Observable<StudentList> {
    return this.httpclient.get<StudentList>(this.baseApiUrl + '/Student/all');
  }

  getStudent(studentId: string): Observable<StudentDetail> {
    return this.httpclient.get<StudentDetail>(
      this.baseApiUrl + '/Student/' + studentId
    );
  }
}
