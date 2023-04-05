import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/Cart.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  cart!: Cart;

  quantity: number = 1;

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  onDecrement(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity);
    }
  }

  onIncrement(cartItem: CartItem) {
    cartItem.quantity++;
    this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity);
  }
}
