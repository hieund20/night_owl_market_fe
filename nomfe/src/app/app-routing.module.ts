import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
