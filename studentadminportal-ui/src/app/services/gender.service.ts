import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenderList } from '../models/api-models/gender.model';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private baseApiUrl = environment.apiUrl; //'https://localhost:5000/api/v3';
  constructor(private httpclient: HttpClient) {}
  getGenders(): Observable<GenderList> {
    return this.httpclient.get<GenderList>(this.baseApiUrl + '/genders');
  }
}
