import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FakeStoreApiService } from '../../services/fake-store-api/fake-store-api.service';
import { SnackbarService } from '../../services/snackbar-service/snackbar.service';
import { TokenServiceService } from '../../services/token-service/token-service.service';
import { Router ,RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  submitted: boolean = false // variable for submission of form 
  loginForm: FormGroup;
  toggelPassword: boolean = false // variable to show password  
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private FakeStoreApiService: FakeStoreApiService,
    private SnackbarService: SnackbarService,
    private TokenServiceService: TokenServiceService,
    private Router: Router

  ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.checkUserIsloginOrNot()

  }

  ngOnInit(): void {

  }
  checkUserIsloginOrNot() {
    let uerToken = this.TokenServiceService.getUserLogintoken()
    if (uerToken) {
      this.Router.navigate(['/all-product']);

    } else {
      console.log('user is not login ')
    }

  }

  goBack() {
    this.location.back();
  }
  get f() {
    return this.loginForm.controls;
  }
  seePassword() {
    this.toggelPassword = !this.toggelPassword
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm)
    if (this.loginForm.invalid) return
    let data = this.loginForm.value
    this.FakeStoreApiService.userLogin(data).subscribe((result) => {
      console.log(result);
      let returnResult: any = result;
      if (returnResult && returnResult['token']) {
        let UserToken = returnResult['token'];
        this.TokenServiceService.saveUserToken(UserToken)
      }
      this.SnackbarService.openSnackbar('Login Successfully ', 'success');
      this.Router.navigate(['/all-product'])


    }, (error) => {
      console.log(error)
      this.SnackbarService.openSnackbar('Login Fail ', 'error');

    })
  }
}
