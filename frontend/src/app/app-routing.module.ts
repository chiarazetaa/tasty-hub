import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes/list', pathMatch: 'full' },
  { path: 'recipes/list', component: RecipeListComponent },
  { path: 'recipes/add', component: AddRecipeComponent },
  { path: 'recipes/:id/update', component: UpdateRecipeComponent },
  { path: 'recipes/:id', component: ViewRecipeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }