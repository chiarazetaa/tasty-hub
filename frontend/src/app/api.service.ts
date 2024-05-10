import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/api/recipes`);
  }

  getRecipe(id: string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/api/recipes/${id}`);
  }

  addRecipe(recipeData: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/api/recipes`, recipeData);
  }

  updateRecipe(id: string, recipeData: any): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/api/recipes/${id}`, recipeData);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/api/recipes/${id}`);
  }
}