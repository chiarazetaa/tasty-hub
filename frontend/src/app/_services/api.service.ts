import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ingredient } from '../_models/ingredient.model';
import { Recipe } from '../_models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getRecipes(page: number): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/api/recipes?page=${page}`);
  }

  getRecipe(id: string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/api/recipes/${id}`);
  }

  addRecipe(recipeData: Recipe): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/api/recipes`, recipeData);
  }

  updateRecipe(id: string, recipeData: Recipe): Observable<any> {
    // exclude _id field from recipeData
    const { _id, ...data } = recipeData;
    return this.http.put<any>(`${environment.backendUrl}/api/recipes/${_id}`, data);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/api/recipes/${id}`);
  }

  addIngredients(recipeId: string, ingredientData: {name: string, quantity: string}): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/api/recipes/${recipeId}/ingredients`, { ingredient: ingredientData });
  }

  updateIngredient(recipeId: string, ingredientId: string, ingredientData: {name: string, quantity: string}): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/api/recipes/${recipeId}/ingredients/${ingredientId}`, ingredientData);
  }

  removeIngredientFromRecipe(recipeId: string, ingredientId: string): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/api/recipes/${recipeId}/ingredients/${ingredientId}`);
  }
}