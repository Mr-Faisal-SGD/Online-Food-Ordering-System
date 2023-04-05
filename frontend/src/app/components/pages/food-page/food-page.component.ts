import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food.model';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'],
})
export class FoodPageComponent {
  food!: Food;
  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private cartService: CartService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        foodService.getFoodById(params.id).subscribe((food) => {
          this.food = food;
        });
    });
  }

  addToCart() {
    this.cartService.addToCart(this.food);
  }
}
