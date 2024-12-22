import { Component } from '@angular/core';
import { RouterLink ,RouterLinkActive} from '@angular/router';
import { TokenServiceService } from '../../services/token-service/token-service.service';
import { FakeStoreApiService } from '../../services/fake-store-api/fake-store-api.service';
import { SnackbarService } from '../../services/snackbar-service/snackbar.service';
import { CartService } from '../../services/cart-service/cart-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  usertoken : any;
  isUserLogin : boolean = false
  addedProductToCartLength : number =0
  constructor(
    private TokenServiceService :TokenServiceService,
    private SnackbarService :SnackbarService,
    private CartService :CartService
  ){

    this.CartService.addedToCartProductArray$.subscribe((cartProducts) => {
      this.addedProductToCartLength = cartProducts.length; // Set the cart length
    });
  }

  ngOnInit(): void {
    this.checkUserIsLogin()
    
  }

  checkUserIsLogin(){
    this.usertoken =this.TokenServiceService.getUserLogintoken();
    console.log(this.usertoken)
    if(this.usertoken){
      this.isUserLogin = true
    }else{
      this.isUserLogin = false

    }
  }

  getUserLogOut(){
    localStorage.removeItem('auth_token');
    this.isUserLogin = false
    this.SnackbarService.openSnackbar('logOut SuccessFully ','success')
    this.usertoken = null 
  }

}
