import { FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-modal-view-order',
  templateUrl: './modal-view-order.component.html',
  styleUrls: ['./modal-view-order.component.scss'],
})
export class ModalViewOrderComponent implements OnInit {
  accessToken: string = '';
  orderDetail: any = null;
  orderCost: number = 0;
  discountPercentage: number = 0;
  //Table
  displayedColumns: string[] = [
    'productId',
    'productName',
    'productPrice',
    'productUnit',
  ];
  dataTableList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTableList);
  //Vouchers
  voucherList: any[] = [];
  vouchersControl = new FormControl('NONE');

  constructor(
    public dialogRef: MatDialogRef<ModalViewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrdersService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getOrderById();
    this.getAvailableVoucherByOrderId();
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

            this.orderCost = res.cost;
          }

          this.dataTableList = this.orderDetail.orderProductList;
          this.dataSource.data = this.dataTableList;
        },
        (err) => {
          console.log('Something is wrong', err);
        }
      );
  }

  getAvailableVoucherByOrderId() {
    this.orderService
      .apiAvailableVoucherByIdOrderGet(this.accessToken, this.data.orderId)
      .subscribe(
        (res) => {
          if (res) {
            this.voucherList = res;
          }
        },
        (err) => {
          console.log('Some thing is wrong', err);
        }
      );
  }

  //Others
  onChangeVoucherSelect(data: any) {
    if (data === 'NONE') {
      //Reset value
      this.orderCost = this.orderDetail.orderCost;
    } else {
      let discountPercentageTemp = Number.parseInt(
        this.voucherList.find((el: any) => el.code === data).discount
      );
      this.discountPercentage = discountPercentageTemp;

      //Reset value
      this.orderCost = this.orderDetail.orderCost;
      this.orderCost =
        this.orderDetail.orderCost * ((100 - discountPercentageTemp) / 100);
    }
  }

  onSaveModal(): void {
    this.dialogRef.close({
      discount: this.discountPercentage,
      code: this.vouchersControl.value,
    });
  }
}
