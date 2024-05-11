import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../_models/recipe.model';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {
  recipeData: Recipe = {
    _id: '',
    name: '',
    description: '',
    ingredients: [],
    instructions: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(private recipeService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  addRecipe() {
    this.recipeService.addRecipe(this.recipeData).subscribe(() => {
      this.router.navigate(['/recipes/list']);
    });
  }

  isValidForm(): boolean {
    if (this.recipeData.name && this.recipeData.description && this.recipeData.instructions) {
      return true;
    } else {
      return false;
    }
  }
}
