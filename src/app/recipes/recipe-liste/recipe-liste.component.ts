import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-liste',
  templateUrl: './recipe-liste.component.html',
  styleUrls: ['./recipe-liste.component.css']
})
export class RecipeListeComponent implements OnInit, OnDestroy {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit():void {
      this.recipes= this.recipeService.getRecipes();
      this.subscription = this.recipeService.recipeChanged.subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
     
    }
  // ngOnInit(): void {
  //   this.recipeService.recipeChanged.subscribe(
  //     (recipes: Recipe[]) => {
  //       this.recipes = recipes;
  //     }
  //   );
  //   this.recipes = this.recipeService.getRecipes();
  // }
  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }
  // OnNewRecipe() {
  //   this.router.navigate(['new'], { relativeTo: this.route });

  // }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
