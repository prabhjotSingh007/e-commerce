import { Component } from '@angular/core';
import { CardComponent } from "../../re-use-component/card/card.component";
import { FiltersComponent } from "../../re-use-component/filters/filters.component";
import { FakeStoreApiService } from '../../services/fake-store-api/fake-store-api.service';
import { SnackbarService } from '../../services/snackbar-service/snackbar.service';
import { ImageShowModalComponent } from "../../re-use-component/image-show-modal/image-show-modal.component";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-all-product-listing',
  standalone: true,
  imports: [CardComponent, FiltersComponent, ImageShowModalComponent],
  templateUrl: './all-product-listing.component.html',
  styleUrl: './all-product-listing.component.css'
})
export class AllProductListingComponent {
  isLoading: boolean = false; //  boolean to show spinner
  filerProductListArray: any = []; // empty array to store filter Poduct Lis
  allProductListArray: any = []; // empty array to store producList

  shareImageUrlToModal: any // url to get store in variable;
  filterCategoryName: any = 'All'// storing the filterName
  loadingSpinner: boolean = false// fot boolean value to show spiiner
  filterObjFromChild: any;
  windowSize :number = 0


  constructor(
    private fakeStoreApi: FakeStoreApiService, // service to get product from store
    private snackbarService: SnackbarService,// snackbar service to get toaster message
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.windowSize = window.innerWidth
    this.getALlProductList();
  }


  /**
    *  function to get all productList From api
    */
  getALlProductList() {
    this.loadingSpinner = true
    this.fakeStoreApi.getAllProductList().subscribe((result) => {
      this.loadingSpinner = false
      this.filerProductListArray = result;
      this.allProductListArray = result
      console.log(this.filerProductListArray)
      if (this.filterObjFromChild) {
        this.applyFilters();
      }
    }, (error) => {
      this.loadingSpinner = false

      console.log(error)

    })
  }





  /**
   *  function to call filter productList From api
   */
  getFilterProductList(categoryName: any) {
    this.loadingSpinner = true

    this.fakeStoreApi.getProductCategoryList(categoryName).subscribe((result) => {
      this.loadingSpinner = false
      this.filerProductListArray = result;
      this.allProductListArray = result
      if (this.filterObjFromChild) {
        this.applyFilters();
      }

    }, (error) => {
      console.log(error);
      this.loadingSpinner = false
    })
  }



  /**
   * function to get image url emit from e
   */
  getImageUrlFomCard(event: any) {
    // console.log(event, ' all list')
    this.shareImageUrlToModal = event
  }


  /**
   * 
   * @param value function to get all product list filter as get param from child
   */
  getFilterValueFromFilterComp(value: any) {
    console.log(value);
    this.filterObjFromChild = value;
    
    if (this.filterCategoryName !== value.category && value.category !== '') {
      (value.category == '' || value.category == 'all') ? this.getALlProductList() : this.getFilterProductList(value.category);
      this.filterCategoryName = value?.category == '' ? 'All' : value?.category;
    }
    
    this.applyFilters();
  }


  /**
   * function to apply filter of price and rating
   */
  applyFilters() {
    this.filerProductListArray = this.allProductListArray;
  
    if (this.filterObjFromChild?.price) {
      this.filerProductListArray = this.filerProductListArray.filter(
        (product: any) =>
          product.price >= this.filterObjFromChild.price.priceFrom &&
          product.price <= this.filterObjFromChild.price.priceTo
      );
    }
  
    if (this.filterObjFromChild?.rating) {
      this.filerProductListArray = this.filerProductListArray.filter(
        (product: any) => Math.ceil(product.rating.rate) >= this.filterObjFromChild.rating
      );
    }
  }
  


}
