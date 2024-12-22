import { Component } from '@angular/core';
import { FakeStoreApiService } from '../../services/fake-store-api/fake-store-api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SnackbarService } from '../../services/snackbar-service/snackbar.service';
import { CardComponent } from "../../re-use-component/card/card.component";
import { ImageShowModalComponent } from "../../re-use-component/image-show-modal/image-show-modal.component";
import { CartService } from '../../services/cart-service/cart-service.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CardComponent, ImageShowModalComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent {
  productId: number = 0;
  starArray: any = []
  productDetail: any;
  loadingSpinner: boolean = false// fot boolean value to show spiiner
  similarProductArray: any = [] // to store similar category product array 
  shareImageUrlToModal: any // url to get store in variable;


  constructor(
    private fakeStoreApiService: FakeStoreApiService,
    private ActivatedRoute: ActivatedRoute,
    private SnackbarService: SnackbarService,
    private Router: Router,
    private CartService :CartService,
    private location :Location

  ) {
  }

  ngOnInit(): void {
    this.getIdFromRouteToGetDetailOfPRoduct()

  }
  getIdFromRouteToGetDetailOfPRoduct() {

    this.ActivatedRoute.params.subscribe((param: any) => {
      this.productId = Number(param['id'])
      this.getProductDetail(this.productId)
    })
  }


  getProductDetail(id: any) {
    this.loadingSpinner = true
    this.fakeStoreApiService.getSingleProducDetail(id).subscribe((reuslt) => {
      // console.log(reuslt);
      this.productDetail = reuslt;
      this.getSimilarProductList(this.productDetail.category)
      let starRating = Math.ceil(Number(this.productDetail.rating.rate)); //  getting the number of star;
      this.createArrayToPrintstar(starRating)
      this.loadingSpinner = false

    }, (error) => {
      console.log(error)
      this.loadingSpinner = false;
      this.SnackbarService.openSnackbar('Something Went Wrong', 'error');
      this.Router.navigate(['/all-product'])

    })
  }

  createArrayToPrintstar(star: any) {
    this.starArray = []

    for (let x = 1; x <= star; x++) {
      this.starArray.push(x)
    }
  }

  /**
 *  function to call filter productList From api
 */
  getSimilarProductList(categoryName: any) {
    this.loadingSpinner = true

    this.fakeStoreApiService.getProductCategoryList(categoryName).subscribe((result) => {
      this.loadingSpinner = false
      let similarArary: any = result;
      // console.log(similarArary)
      let getArrayOfExcludedCurrentProduct: any = similarArary.filter((e: any) => e.id !== this.productId)
      // console.log(getArrayOfExcludedCurrentProduct)
      if (getArrayOfExcludedCurrentProduct.length > 3) {
        this.similarProductArray = getArrayOfExcludedCurrentProduct.slice(0, 3)
      } else {

        this.similarProductArray = getArrayOfExcludedCurrentProduct;
      }


    }, (error) => {
      console.log(error);
      this.loadingSpinner = false
    })
  }

  goBack() {
    this.location.back();
  }
  
  /**
   * function to get image url emit from e
   */
  getImageUrlFomCard(event: any) {
    // console.log(event, ' all list')
    this.shareImageUrlToModal = event
  }


  addToCart(product: any) {

    this.CartService.AddProductToCart(product)
  }

}
