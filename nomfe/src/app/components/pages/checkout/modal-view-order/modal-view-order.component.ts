import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-modal-view-order',
  templateUrl: './modal-view-order.component.html',
  styleUrls: ['./modal-view-order.component.scss'],
})
export class ModalViewOrderComponent implements OnInit {
  accessToken: string = '';
  orderDetail: any = null;
  //Table
  displayedColumns: string[] = [
    'productId',
    'productName',
    'productPrice',
    'productUnit',
  ];
  dataTableList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTableList);

  constructor(
    public dialogRef: MatDialogRef<ModalViewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getOrderById();
  }

  //API
  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getOrderById() {
    this.orderService
      .apiOrderIdGet(this.accessToken, this.data.orderId)
      .subscribe(
        (res) => {
          if (res) {
            console.log('check res', res);
            let productListTemp: any = [];
            res.orderdetail_set.forEach((el: any) => {
              productListTemp.push({
                productName: el.product_option.base_product.name,
                productPrice: el.product_option.price,
                productUnit: el.product_option.unit,
                productId: el.product_option.base_product.id,
                optionId: el.product_option.id,
              });
            });

            this.orderDetail = {
              sellerFullName: `${res.store.last_name} ${res.store.first_name}`,
              sellerAvatar: res.store.avatar,
              orderCost: res.cost,
              orderTotalShippingFee: res.total_shipping_fee,
              orderVoucherApply: res.voucher_apply,
              orderProductList: [...productListTemp],
            };
          }

          this.dataTableList = this.orderDetail.orderProductList;
          this.dataSource.data = this.dataTableList;
          console.log('check res', this.orderDetail);
        },
        (err) => {
          console.log('Something is wrong', err);
        }
      );
  }

  //Others
}
