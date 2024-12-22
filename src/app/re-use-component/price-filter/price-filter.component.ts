import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { SnackbarService } from '../../services/snackbar-service/snackbar.service';
import { NumOnlyDirective } from '../../directives/numberOnly/num-only.directive';
import { MatSliderModule } from "@angular/material/slider";

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [NumOnlyDirective, MatSliderModule],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.css'
})
export class PriceFilterComponent {
  @Output() priceRange = new EventEmitter<any>
  @Input()  resetPriceFilter : any

  maxValueError: boolean = false
  minValueError: boolean = false
  inputPriceTO: number = 0; // for search price To
  inputPriceMax: number = 1000; // for search price input max value
  inputPriceMin: number = 0; // for search price input min value
  inputPriceFrom: number = 0; // for search price from;
  priceRangeObj: any = { priceFrom: 0, priceTo: 1000 }

  constructor(

    private snackbarService: SnackbarService,
  ) {

  }

ngOnChanges(changes: SimpleChanges): void {
 if(changes['resetPriceFilter']){
  if(this.resetPriceFilter){
    this.inputPriceTO = this.inputPriceMax
    this.priceRangeObj = { priceFrom: 0, priceTo: 1000 };
    this.maxValueError = false
    this.minValueError = false
  }
 }
  
}

  ngOnInit(): void {

    this.inputPriceTO = this.inputPriceMax


  }

  // funtion get max value for inputPriceTO
  getMatMaxValue(e: any) {
    if (Number(e.target.value) <= this.inputPriceFrom) {
      this.snackbarService.openSnackbar(
        "The 'price from' value must be less than the 'price to' value",
        "error"
      );
      this.maxValueError = true
      // e.target.value =0 ;
      return
    }
    this.maxValueError = false

    this.inputPriceTO = Number(e.target.value);
    this.priceRangeObj.priceTo = this.inputPriceTO;

    this.priceRange.emit(this.priceRangeObj)

    console.log(typeof this.inputPriceTO, this.inputPriceTO);

  }
  // funtion get min value for inputPriceFrom
  getMatMinValue(e: any) {
    if (Number(e.target.value) >= this.inputPriceTO) {
      this.snackbarService.openSnackbar(
        "The 'price to' value must be greater than the 'price from' value",
        "error"
      );
      // e.target.value = this.inputPriceTO - 1;
      this.minValueError = true
      return

    }
    this.minValueError = false

    this.inputPriceFrom = Number(e.target.value);
    this.priceRangeObj.priceFrom = this.inputPriceFrom;
    this.priceRange.emit(this.priceRangeObj)

    console.log(typeof this.inputPriceFrom, this.inputPriceFrom);
  }

}
