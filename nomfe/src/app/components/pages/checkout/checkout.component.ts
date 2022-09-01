import { FormGroup, FormControl } from '@angular/forms';
import { OrderDetailService } from './../../../services/order-detail.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentMethods } from '../../constants/payment-methods';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  accessToken: string = '';
  dataTableList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTableList);
  displayedColumns: string[] = [
    'name',
    'unit',
    'price',
    'quantity',
    'total_price',
  ];
  totalProduct: number = 0;
  totalFinalPrice: number = 0;
  //Payment
  paymentMethodList = PaymentMethods;
  paymentMethodForm = new FormGroup({
    method: new FormControl(this.paymentMethodList[1].value),
  });
  isEditPaymentForm: boolean = false;
  paymentMethodShow: string = this.paymentMethodList[1].viewValue;

  constructor(
    private orderDetailService: OrderDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getOrderDetailList();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  //API
  getOrderDetailList() {
    this.dataTableList = [];

    this.orderDetailService.apiOrderDetailsGet(this.accessToken).subscribe(
      (res) => {
        console.log('check res', res);
        if (res) {
          this.totalProduct = res.count;

          res.results.forEach((el: any) => {
            this.dataTableList.push({
              id: el.id,
              name: el.product_option.base_product.name,
              unit: el.product_option.unit,
              price: Number.parseInt(el.unit_price),
              quantity: el.quantity,
              total_price: el.quantity * Number.parseInt(el.unit_price),
            });

            this.totalFinalPrice +=
              el.quantity * Number.parseInt(el.unit_price);
          });
          this.dataSource.data = this.dataTableList;
        }
      },
      (error) => {
        console.log('Error when get order detail list: ', error);
      }
    );
  }

  //Others
  onPaymentMethodSelectChange(data: any) {
    this.paymentMethodList.forEach((el) => {
      if (el.value === data) {
        this.paymentMethodShow = el.viewValue;
      }
    });
  }
}
