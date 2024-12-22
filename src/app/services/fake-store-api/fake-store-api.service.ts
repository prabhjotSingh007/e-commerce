import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class FakeStoreApiService {

  constructor(
    private http: HttpClient
  ) { }

  // to get all product list 
  getAllProductList() {
    return this.http.get(`${environment.apiUrl}/products`)
  }

  // to get all categories list
  getAllCategoriesList() {
    return this.http.get(`${environment.apiUrl}/products/categories`)
  }

  // get product List based on category
  getProductCategoryList(categoryName: any) {
    return this.http.get(`${environment.apiUrl}/products/category/${categoryName}`)
  }

  // get single Product detail from api 
  getSingleProducDetail(productId: any) {
    return this.http.get(`${environment.apiUrl}/products/${productId}`)
  }

  
  // get user Login
  userLogin(data: any) {
    return this.http.post(`${environment.apiUrl}/auth/login`,data)
  }
}
