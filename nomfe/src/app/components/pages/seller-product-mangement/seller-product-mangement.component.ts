import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';
import { ModalAddProductComponent } from './modal-add-product/modal-add-product.component';
import { ProductListTabComponent } from './tab-list-orders/product-list-tab/product-list-tab.component';

@Component({
  selector: 'app-seller-product-mangement',
  templateUrl: './seller-product-mangement.component.html',
  styleUrls: ['./seller-product-mangement.component.scss'],
})
export class SellerProductMangementComponent implements OnInit {
  accessToken: string = '';
  currentUser: any = {};
  page: number = 1;
  dataList: any = [];
  tabIndex: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  //API
  //--Product list
  // getAccessToken() {
  //   this.accessToken = <string>localStorage.getItem('access_token');
  // }

  // getCurrentUser() {
  //   this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}');
  // }

  // getProductList(page: number) {
  //   this.productService
  //     .apiProductGet(this.page, null, null, this.currentUser.id)
  //     .subscribe(
  //       (res) => {
  //         if (res) {
  //           this.dataList = res.results;
  //           res.results.forEach((el: any) => {
  //             this.dataList.push({
  //               id: el.id,
  //               name: el.name,
  //               price: el.min_price,
  //               sold_amount: el.sold_amount,
  //             });
  //           });
  //         }
  //       },
  //       (err) => {
  //         console.log('Have a error when get product list', err);
  //       }
  //     );
  // }

  //Others
  onTabChange(e: any) {
    this.tabIndex = e.index;
    switch (this.tabIndex) {
      case 0:
        window.location.hash = 'actions';
        break;
      case 1:
        window.location.hash = 'accepts';
        break;
      default:
        break;
    }
  }
}
