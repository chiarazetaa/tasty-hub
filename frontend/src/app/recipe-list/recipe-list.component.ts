import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes: any[] = [];

  constructor(private recipeService: ApiService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  deleteRecipe(id: string) {
    this.recipeService.deleteRecipe(id).subscribe(() => {
      this.recipes = this.recipes.filter(recipe => recipe._id !== id);
    });
  }

  removeIngredientFromRecipe(recipe: any, ingredientName: string): void {
    let recipeId = recipe._id
    this.recipeService.removeIngredientFromRecipe(recipeId, ingredientName).subscribe({
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
