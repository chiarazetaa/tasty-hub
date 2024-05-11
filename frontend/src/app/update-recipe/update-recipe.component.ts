import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../_models/recipe.model';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.scss']
})
export class UpdateRecipeComponent {
  recipeId: string = '';
  recipeData: Recipe = {
    _id: '',
    name: '',
    description: '',
    ingredients: [],
    instructions: '',
    createdAt: new Date(),
    updatedAt: new Date()
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

  isValidForm(): boolean {
    if (this.recipeData.name && this.recipeData.description && this.recipeData.instructions) {
      return true;
    } else {
      return false;
    }
  }
}
