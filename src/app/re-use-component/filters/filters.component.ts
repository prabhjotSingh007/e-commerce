import { Component, EventEmitter, Output } from '@angular/core';
import { PriceFilterComponent } from "../price-filter/price-filter.component";
import { FakeStoreApiService } from '../../services/fake-store-api/fake-store-api.service';


@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [PriceFilterComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {

  @Output() filterSarchValue = new EventEmitter<any>  // data sharing method beween child and parent 
  selectedStarValue : any = 1;
  allCategoryListArray: any = [] // to store all categorylist array
  filterVAlueObject : any  = {category : '' , price : null , rating : null } // to save filter list 
  resetPrice :boolean =false
  constructor(
    private fakeStoreApi: FakeStoreApiService, // service to get product from store
  ) {
  }

  ngOnInit(): void {
    this.getAllCategoriesListForFilter() // calling the function to get all categoryList to get store in categoryListAray
    // this.getAllCategoryValue('all')
  }

  // function get all category List
  getAllCategoriesListForFilter() {
    this.fakeStoreApi.getAllCategoriesList().subscribe((result) => {
      this.allCategoryListArray = result

    }, (error) => {
      console.log(error)
    })
  } /**
   * 
   * @param cat here cat is parm which indicate the name of the selected category
   */
  getAllCategoryValue(cat : string){
    this.filterVAlueObject.category = cat == 'All' ? '' : cat;
    console.log(this.filterVAlueObject)
    this.filterSarchValue.emit(this.filterVAlueObject)
  }

  getSearchByStarValue(value: number){
    console.log(value)
    this.selectedStarValue = value;
    this.filterVAlueObject.rating = value ;
    this.filterSarchValue.emit(this.filterVAlueObject)

  }

/**
 * 
 * @param e function to get price range from price filter
 */
  getPriceRangeValue(e: any){
    console.log(e)
    this.filterVAlueObject.price =e;
    this.filterSarchValue.emit(this.filterVAlueObject)

  }

  resetAllfilter(){
    this.filterVAlueObject.price = null ;
    this.filterVAlueObject.rating = null ;

    this.filterSarchValue.emit(this.filterVAlueObject)
    this.selectedStarValue = 1

    this.resetPrice = true;
    setTimeout(()=>{
    this.resetPrice = false;

    },1000)
  }
}
