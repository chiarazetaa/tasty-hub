import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Method to fetch data from backend
  getData(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/api/data`);
  }

}