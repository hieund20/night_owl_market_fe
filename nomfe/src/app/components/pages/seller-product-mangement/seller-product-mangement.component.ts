import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';
import { ModalAddProductComponent } from './modal-add-product/modal-add-product.component';

@Component({
  selector: 'app-seller-product-mangement',
  templateUrl: './seller-product-mangement.component.html',
  styleUrls: ['./seller-product-mangement.component.scss'],
})
export class SellerProductMangementComponent implements OnInit {
  accessToken: string = '';
  dataTableList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTableList);
  displayedColumns: string[] = ['id', 'name', 'price', 'sold_amount', 'action'];
  page: number = 1;
  pageLength: number = 0;
  orderIdList: number[] = [];
  orderList: any = [];

  constructor(private orderService: OrdersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getProductList(this.page);
    setTimeout(() => {
      this.fetchOrderList();
    }, 1000);
  }

  //API
  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getProductList(page: number) {
    this.orderService
      .apiOrdersGet(this.accessToken, null, 1, this.page)
      .subscribe(
        (res) => {
          this.dataTableList = res.results;
          this.dataSource.data = this.dataTableList;
          this.pageLength = res.count;

          res.results.forEach((el: any) => {
            this.orderIdList.push(el.id);
          });
        },
        (error) => {
          console.log('Have a error when get product list', error);
        }
      );
  }

  getOrderById(id: number) {
    this.orderService.apiOrderIdGet(this.accessToken, id).subscribe(
      (res) => {
        if (res) {
          this.orderList.push({
            id: res.id,
            name: res.orderdetail_set[0].product_option.base_product.name,
            price: res.orderdetail_set[0].unit_price,
            sold_amount: res.orderdetail_set.length,
          });
        }
      },
      (err) => {
        console.log('Have a error when get order detail by id', err);
      }
    );
  }

  fetchOrderList() {
    if (this.orderIdList.length !== 0) {
      this.orderIdList.forEach((el) => {
        this.getOrderById(el);
      });

      setTimeout(() => {
        this.dataSource = this.orderList;
      }, 1000);
    }
  }

  //Others
  onProductPageChange(data: any) {
    this.page = data.pageIndex + 1;
    this.getProductList(this.page);
  }

  onOpenAddProductModal(isAdd: boolean) {
    const dialogRef = this.dialog.open(ModalAddProductComponent, {
      width: '800px',
      data: { isAdd: isAdd },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProductList(this.page);
      }
    });
  }
}
