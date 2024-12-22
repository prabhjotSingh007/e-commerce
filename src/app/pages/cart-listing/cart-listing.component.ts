import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../../services/cart-service/cart-service.service';
@Component({
  selector: 'app-cart-listing',
  standalone: true,
  imports: [],
  templateUrl: './cart-listing.component.html',
  styleUrl: './cart-listing.component.css'
})
export class CartListingComponent {
  cartItems: any[] = [];
  totalItems: number = 0;
  totalPrice : any

  constructor(
    private Location :Location,
    private cartService: CartService
  ){
    this.cartService.addedToCartProductArray$.subscribe((cartProducts) => {
      this.cartItems = cartProducts;

      this.calculateTotalItems(cartProducts);
      this.getTotalPriceOFProducts(cartProducts)
    });

  }
  calculateTotalItems(cartProducts: any[]) {
    this.totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
    console.log(this.totalItems)
  }

  getTotalPriceOFProducts(cartProducts: any[]){
    this.totalPrice = cartProducts.reduce((sum, item) => sum + item.price, 0);
    console.log(this.totalItems)
  }

  increaseQuantity(productId: number) {
    this.cartService.IncreaseProductQuantity(productId);
  }

  // Decrease the quantity of a product
  decreaseQuantity(productId: number) {
    this.cartService.DecreaseProductQuantity(productId);
  }

  goBack() {
    this.Location.back();
  }

  removeProduct(id: any){
    this.cartService.RemoveProductFromCart(id);

  }
}
