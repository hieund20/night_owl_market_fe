import { SellerProductMangementComponent } from './components/pages/seller-product-mangement/seller-product-mangement.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { PurchaseComponent } from './components/pages/purchase/purchase.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'product',
    children: [
      {
        path: ':id',
        component: ProductDetailComponent,
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
    ],
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'purchase',
    component: PurchaseComponent,
  },
  {
    path: 'seller',
    children: [
      {
        path: 'product-management',
        component: SellerProductMangementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
