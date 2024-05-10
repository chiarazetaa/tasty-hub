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
}
