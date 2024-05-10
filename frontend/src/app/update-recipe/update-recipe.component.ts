import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.scss']
})
export class UpdateRecipeComponent {
  recipeId: string = '';
  recipeData: any = {
    name: '',
    description: '',
    ingredients: [],
    instructions: []
  };

  constructor(private route: ActivatedRoute, private recipeService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      this.recipeService.getRecipe(this.recipeId).subscribe(data => {
        this.recipeData = data;
      });
    });
  }

  updateRecipe() {
    this.recipeService.updateRecipe(this.recipeId, this.recipeData).subscribe(() => {
      this.router.navigate(['/recipes/list']);
    });
  }

  addIngredientField(): void {
    this.recipeData.ingredients.push({ name: '', quantity: '' });
  }
}
