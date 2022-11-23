import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseApiUrl = 'https://localhost:5000'; // https://localhost:5000/api/v3/Student/all
  constructor(private httpclient: HttpClient) {}
  getStudents(): Observable<any> {
    return this.httpclient.get<any>(this.baseApiUrl + '/api/v3/Student/all');
  }
}
