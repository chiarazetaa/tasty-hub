import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {
  recipeData: any = {
    name: '',
    description: '',
    ingredients: [],
    instructions: []
  };

  constructor(private recipeService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  addRecipe() {
    this.recipeService.addRecipe(this.recipeData).subscribe(() => {
      this.router.navigate(['/recipes/list']);
    });
  }

  addIngredientField(): void {
    this.recipeData.ingredients.push({ name: '', quantity: '' });
  }
}
