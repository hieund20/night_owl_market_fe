import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderDetailService } from './../../../services/order-detail.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentMethods } from '../../constants/payment-methods';
import { OrdersService } from 'src/app/services/orders.service';

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
  //Address
  addressForm = new FormGroup({
    address: new FormControl(
      '35/28 Lê Bình, phường 04, quận Tân Bình',
      Validators.required
    ),
  });
  isEditAddressForm: boolean = false;

  constructor(
    private orderService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getOrdersList();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  //API
  getOrdersList() {
    this.dataTableList = [];

    this.orderService.apiOrdersGet(this.accessToken, '0').subscribe(
      (res) => {
        console.log('check res', res);
        if (res) {
          this.totalProduct = res.count;

          res.results.forEach((el: any) => {
            this.dataTableList.push({
              id: el.id,
              name: el.orderdetail_set[0].product_option.base_product.name,
              unit: el.orderdetail_set[0].product_option.unit,
              price: el.orderdetail_set[0].unit_price,
              quantity: el.orderdetail_set.length,
              total_price: el.cost,
            });

            this.totalFinalPrice += el.cost;
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
  onAddressFormSubmit() {
    const controls = <any>this.addressForm.controls;

    if (this.addressForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.isEditAddressForm = false;
  }

  onPaymentMethodSelectChange(data: any) {
    this.paymentMethodList.forEach((el) => {
      if (el.value === data) {
        this.paymentMethodShow = el.viewValue;
      }
    });
  }
}
