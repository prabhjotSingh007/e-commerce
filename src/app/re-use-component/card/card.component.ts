import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TokenServiceService } from '../../services/token-service/token-service.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service/cart-service.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() inputProductDetail: any
  @Output() shareImageUrl = new EventEmitter<any>

  porductDetail: any;
  starArray: any = [] // to store star array;
  isUserLogin: boolean = false

  constructor(
    private TokenServiceService: TokenServiceService,
    private Router: Router,
    private CartService: CartService

  ) {
    this.checkUserIsloginOrNot()
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  checkUserIsloginOrNot() {
    let uerToken = this.TokenServiceService.getUserLogintoken()
    console.log(uerToken)
    if (uerToken) {
      this.isUserLogin = true
    } else {
      this.isUserLogin = false

    }

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputProductDetail']) {
      this.porductDetail = changes['inputProductDetail'].currentValue; // getting the current value of object pass in input
      let starRating = Math.ceil(Number(this.porductDetail.rating.rate)); //  getting the number of star;
      this.createArrayToPrintstar(starRating) // function create array to easily print number of star 
    }
  }
  createArrayToPrintstar(star: any) {
    this.starArray = []
    for (let x = 1; x <= star; x++) {
      this.starArray.push(x)
    }
  }

  shareImageToModal(url: any, event: any) {
    event.stopPropagation()
    // console.log(url , 'card')
    this.shareImageUrl.emit(url)
  }

  addToCart(product: any, event: any) {
    event.stopPropagation()

    this.CartService.AddProductToCart(product)
  }

}
