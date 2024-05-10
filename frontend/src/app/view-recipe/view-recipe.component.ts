import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent {
  recipeId: string = '';
  recipeData: any;

  constructor(private route: ActivatedRoute, private recipeService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      this.recipeService.getRecipe(this.recipeId).subscribe(data => {
        this.recipeData = data;
      });
    });
  }
}
