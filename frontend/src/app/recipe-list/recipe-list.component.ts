import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes: any[] = [];
  addIngredientsVisible: boolean = false;
  addEmptyIngredientsVisible: boolean = true;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private recipeService: ApiService) { }

  ngOnInit(): void {
    this.fetchRecipes(this.currentPage);
  }

  fetchRecipes(page: number): void {
    this.recipeService.getRecipes(page).subscribe({
      next: (data) => {
        this.recipes = data.recipes;
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchRecipes(this.currentPage);
    }
  }

  deleteRecipe(id: string) {
    this.recipeService.deleteRecipe(id).subscribe(() => {
      window.location.reload();
    });
  }

  addEmptyIngredient(recipe: any): void {
    recipe.ingredients.push({ name: '', quantity: '' });
    // check if any ingredient is missing name or quantity
    this.addIngredientsVisible = recipe.ingredients.some((ingredient: any) => !ingredient.name || !ingredient.quantity);
    this.addEmptyIngredientsVisible = recipe.ingredients.every((ingredient: any) => ingredient.name && ingredient.quantity);
  }

  addIngredients(recipe: any, ingredient: any): void {
    let recipeId = recipe._id;
    let ingredientData = { name: ingredient.name, quantity: ingredient.quantity }; 

    this.recipeService.addIngredients(recipeId, ingredientData).subscribe({
      next: (response) => {
        window.location.reload();
        console.log('Ingredient added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding ingredient:', error);
      }
    });
  }

  updateIngredient(recipeId: string, ingredient: any): void {
    this.recipeService.updateIngredient(recipeId, ingredient._id, { name: ingredient.name, quantity: ingredient.quantity }).subscribe({
      next: () => {
        window.location.reload();
        console.log('Ingredient updated successfully');
      },
      error: (error) => {
        console.error('Failed to update ingredient:', error);
      }
    });
  }

  removeIngredientFromRecipe(recipe: any, ingredientId: string): void {
    let recipeId = recipe._id;
    this.recipeService.removeIngredientFromRecipe(recipeId, ingredientId).subscribe({
      next: () => {
        window.location.reload();
        console.log('Ingredient removed successfully');
      },
      error: (error) => {
        console.error('Failed to remove ingredient:', error);
      }
    });
  }
}
