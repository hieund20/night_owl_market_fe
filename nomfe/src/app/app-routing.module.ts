import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckVerifiedAccountComponent } from './components/pages/check-verified-account/check-verified-account.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { PurchaseComponent } from './components/pages/purchase/purchase.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { SellerOrderManagementComponent } from './components/pages/seller-pages/seller-order-management/seller-order-management.component';
import { SellerProductMangementComponent } from './components/pages/seller-product-mangement/seller-product-mangement.component';
import { ShopDetailComponent } from './components/pages/shop-detail/shop-detail.component';

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
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
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
    path: 'purchase#pending',
    component: PurchaseComponent,
  },
  {
    path: 'seller',
    children: [
      {
        path: 'product-management',
        component: SellerProductMangementComponent,
      },
      {
        path: 'order-management',
        component: SellerOrderManagementComponent,
      },
    ],
  },
  {
    path: 'shop-detail',
    children: [
      {
        path: ':id',
        component: ShopDetailComponent,
      },
    ],
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },

  {
    path: 'myaccount',
    component: MyAccountComponent,
  },
  {
    path: 'myaccount',
    children: [
      {
        path: 'verified',
        component: CheckVerifiedAccountComponent,
      },
      {
        path: 'verified#email',
        component: CheckVerifiedAccountComponent,
      },
      {
        path: 'verified#phone',
        component: CheckVerifiedAccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
