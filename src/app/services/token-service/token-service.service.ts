import { Injectable } from '@angular/core';
import { SnackbarService } from '../snackbar-service/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  constructor(
    private SnackbarService :SnackbarService
  ) { }

  
  saveUserToken(token: any) {
     localStorage.setItem('auth_token', token);
  }
  getUserLogintoken() {
      let getToken = localStorage.getItem('auth_token');
      return getToken ?? null
  
  }

}
