import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AllProductListingComponent } from './pages/all-product-listing/all-product-listing.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { RouterOutletMainComponent } from './pages/router-outlet-main/router-outlet-main.component';
import { LoginComponent } from './pages/login/login.component';
import { CartListingComponent } from './pages/cart-listing/cart-listing.component';
import { AuthGuardService } from './services/Auth-guard/auth-guard.service';



export const routes: Routes = [

    { path: "", pathMatch: "full", redirectTo: "all-product" },
    // {
    //     path : '**',
    //     redirectTo: "all-product" 
    // },

    {
        path: '',
        component: RouterOutletMainComponent,
        children: [
            // {
            //     path: 'home',
            //     component: HomeComponent,
            // },
            {
                path: 'all-product',
                component: AllProductListingComponent,
                // canActivate: [AuthGuardService],

            },
            {
                path: 'product-detail/:id',
                component: DetailPageComponent
            },
            {
                path : 'cart',
                component :CartListingComponent,
                canActivate: [AuthGuardService],

            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        // canActivate: [AuthGuardService],
    },
    {
        path: '**',
        redirectTo: 'all-product', // Wildcard route redirects to login if route is not found
      },

];
