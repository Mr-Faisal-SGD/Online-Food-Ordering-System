import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User.model';
import { Food } from 'src/app/shared/models/food.model';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'],
})
export class FoodPageComponent {
  params!: any;
  user!: User;
  food!: Food;
  constructor(
    activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private userService: UserService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        foodService.getFoodById(params.id).subscribe((food) => {
          this.food = food;
          this.params = params.id;
        });
    });
    this.user = this.userService.getUser;
  }

  addToCart() {
    this.cartService.addToCart(this.food);
  }

  onDelete() {
    this.foodService.onDelete(this.food.id);
    console.log('Deleted food with id: ' + this.params);
  }
}
