import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

import { CustomCurrencyPipe } from './components/shared/pipe/currency.pipe';
import { CartComponent } from './components/pages/cart/cart.component';
import { PurchaseComponent } from './components/pages/purchase/purchase.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerProductMangementComponent } from './components/pages/seller-product-mangement/seller-product-mangement.component';
import { ModalAddProductComponent } from './components/pages/seller-product-mangement/modal-add-product/modal-add-product.component';
import { ModalAddAddressComponent } from './components/pages/checkout/modal-add-address/modal-add-address.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProductListTabComponent } from './components/pages/seller-product-mangement/tab-list-orders/product-list-tab/product-list-tab.component';
import { AllPurchaseTabComponent } from './components/pages/purchase/tab-list-purchase/all-purchase-tab/all-purchase-tab.component';
import { PendingPurchaseTabComponent } from './components/pages/purchase/tab-list-purchase/pending-purchase-tab/pending-purchase-tab.component';
import { DeliveringPurchaseTabComponent } from './components/pages/purchase/tab-list-purchase/delivering-purchase-tab/delivering-purchase-tab.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { SellerOrderManagementComponent } from './components/pages/seller-pages/seller-order-management/seller-order-management.component';
import { ReceivedPurchaseTabComponent } from './components/pages/purchase/tab-list-purchase/received-purchase-tab/received-purchase-tab.component';
import { CanceledPurchaseTabComponent } from './components/pages/purchase/tab-list-purchase/canceled-purchase-tab/canceled-purchase-tab.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { MyAccountTabComponent } from './components/pages/my-account/tab-list-my-account/my-account-tab/my-account-tab.component';
import { AddCoinTabComponent } from './components/pages/my-account/tab-list-my-account/add-coin-tab/add-coin-tab.component';
//Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
//Ngx-spinner
import { NgxSpinnerModule } from 'ngx-spinner';
import { CheckVerifiedAccountComponent } from './components/pages/check-verified-account/check-verified-account.component';
import { VerifiedEmailTabComponent } from './components/pages/check-verified-account/tab-list-check-account/verified-email-tab/verified-email-tab.component';
import { VerifiedPhoneTabComponent } from './components/pages/check-verified-account/tab-list-check-account/verified-phone-tab/verified-phone-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ProductDetailComponent,
    RegisterPageComponent,
    LoginPageComponent,
    CustomCurrencyPipe,
    CartComponent,
    PurchaseComponent,
    CheckoutComponent,
    SellerProductMangementComponent,
    ModalAddProductComponent,
    ModalAddAddressComponent,
    ProductListTabComponent,
    AllPurchaseTabComponent,
    PendingPurchaseTabComponent,
    DeliveringPurchaseTabComponent,
    PaymentComponent,
    SellerOrderManagementComponent,
    ReceivedPurchaseTabComponent,
    CanceledPurchaseTabComponent,
    MyAccountComponent,
    MyAccountTabComponent,
    AddCoinTabComponent,
    CheckVerifiedAccountComponent,
    VerifiedEmailTabComponent,
    VerifiedPhoneTabComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbCollapseModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    NgxStarRatingModule,
    MatChipsModule,
    MatBadgeModule,
    MatRadioModule,
    MatTableModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatDividerModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxSpinnerModule.forRoot({
      type: 'ball-spin-fade',
    }),
    CloudinaryModule,
    NgxDropzoneModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  exports: [NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
