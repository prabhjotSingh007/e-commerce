import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../../services/cart-service/cart-service.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart-listing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-listing.component.html',
  styleUrl: './cart-listing.component.css'
})
export class CartListingComponent {
  cartItems: any[] = [];
  totalItems: number = 0;
  totalPrice : any;
  priceWihTax : any;
  taxPercentage : number = .25 // 25 % tax

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
    console.log(cartProducts)
  let  totalCartPrice = cartProducts.reduce((sum, item) => sum + item.price, 0);
     this.totalPrice = Math.ceil(totalCartPrice);
    this.priceWihTax = this.totalPrice  + (this.totalPrice*this.taxPercentage)
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
