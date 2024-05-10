import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes: any[] = [];
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

  updateIngredient(recipeId: string, ingredient: any): void {
    this.recipeService.updateIngredient(recipeId, ingredient._id, { name: ingredient.name, quantity: ingredient.quantity })
      .subscribe({
        next: () => {
          console.log('Ingredient updated successfully');
        },
        error: (error) => {
          console.error('Failed to update ingredient:', error);
        }
      });
  }

  removeIngredientFromRecipe(recipeId: any, ingredientId: string): void {
    this.recipeService.removeIngredientFromRecipe(recipeId, ingredientId).subscribe({
      next: () => {
        console.log('Ingredient removed successfully');
        window.location.reload();
      },
      error: (error) => {
        console.error('Failed to remove ingredient:', error);
      }
    });
  }
}
