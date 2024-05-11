import { Component } from '@angular/core';
import { Ingredient } from '../_models/ingredient.model';
import { Recipe } from '../_models/recipe.model';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
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

  addEmptyIngredient(recipe: Recipe): void {
    recipe.ingredients.push({ _id: '', name: '', quantity: '' });
    // check if any ingredient is missing name or quantity
    this.addIngredientsVisible = recipe.ingredients.some((ingredient: Ingredient) => !ingredient.name || !ingredient.quantity);
    this.addEmptyIngredientsVisible = recipe.ingredients.every((ingredient: Ingredient) => ingredient.name && ingredient.quantity);
  }

  addIngredients(recipe: Recipe, ingredient: Ingredient): void {
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

  updateIngredient(recipeId: string, ingredient: Ingredient): void {
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

  removeIngredientFromRecipe(recipe: Recipe, ingredientId: string): void {
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
