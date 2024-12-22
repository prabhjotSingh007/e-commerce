import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from '../snackbar-service/snackbar.service';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Create a BehaviorSubject to track the added products
  private addedToCartProductSubject = new BehaviorSubject<any[]>([]);
  addedToCartProductArray$ = this.addedToCartProductSubject.asObservable();

  constructor(
    private SnackbarService :SnackbarService

  ) {}
// Method to add a product to the cart
AddProductToCart(product: any) {
  const currentCart = this.addedToCartProductSubject.getValue();

  // Check if the product already exists in the cart
  const productExists = currentCart.some((item) => item.id === product.id);

  if (productExists) {
    console.log('Product already exists in the cart');
    this.SnackbarService.openSnackbar('Product already exists in the cart', "error");
  } else {
    // Add the product with initial quantity set to 1
    const newProduct = { ...product, quantity: 1, totalPrice: product.price };
    const updatedCart = [...currentCart, newProduct];
    this.addedToCartProductSubject.next(updatedCart);

    console.log('Product added to the cart');
    this.SnackbarService.openSnackbar('Product added to the cart', "success");
  }
}

// Method to increase the product's quantity
IncreaseProductQuantity(productId: number) {
  const currentCart = this.addedToCartProductSubject.getValue();
  const updatedCart = currentCart.map((item) => {
    if (item.id === productId) {
      const updatedQuantity = item.quantity + 1;
      const updatedTotalPrice = updatedQuantity * item.price; // Update total price based on quantity
      return { ...item, quantity: updatedQuantity, price: updatedTotalPrice };
    }
    return item;
  });
  this.addedToCartProductSubject.next(updatedCart);
}

// Method to decrease the product's quantity
DecreaseProductQuantity(productId: number) {
  const currentCart = this.addedToCartProductSubject.getValue();
  
  const updatedCart = currentCart.map((item) => {
    if (item.id === productId) {
      // Only decrease if quantity is greater than 1
      if (item.quantity > 1) {
        const updatedQuantity = item.quantity - 1;
        const updatedTotalPrice = updatedQuantity * item.price; // Update total price based on new quantity
        return { ...item, quantity: updatedQuantity, price: updatedTotalPrice };
      } else {
        // If quantity is 1, don't decrease further or return the item as it is
        console.log('Cannot decrease quantity below 1');
        return item;
      }
    }
    return item;
  });
  this.addedToCartProductSubject.next(updatedCart); // Update the cart with the new values  
}

// Method to remove a product from the cart
RemoveProductFromCart(productId: number) {
  const currentCart = this.addedToCartProductSubject.getValue();
  const updatedCart = currentCart.filter((item) => item.id !== productId);
  this.addedToCartProductSubject.next(updatedCart);

  this.SnackbarService.openSnackbar('Product removed from the cart', "success");
}

}
