import { AddressService } from './../../../services/address.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { PaymentMethods } from '../../constants/payment-methods';
import { GhnLocationService } from 'src/app/services/ghn-services/ghn-location.service';

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
  pageLength: number = 0;
  page: number = 1;
  totalProduct: number = 0;
  totalFinalPrice: number = 0;
  //Payment
  paymentMethodList = PaymentMethods;
  paymentMethodForm = new FormGroup({
    method: new FormControl(this.paymentMethodList[1].value),
  });
  isEditPaymentForm: boolean = false;
  paymentMethodShow: string = this.paymentMethodList[1].viewValue;
  
  //GHN
  provinceList: any[] = [];
  //Address
  addressList: any[] = [];
  addressForm = new FormGroup({
    province: new FormControl(this.provinceList[0], Validators.required),
  });
  isEditAddressForm: boolean = false;

  constructor(
    private orderService: OrdersService,
    private addressService: AddressService,
    private ghnLocationService: GhnLocationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getOrdersList(this.page);
    this.getMyAddressList();
    this.getAllProvinceOfVietNam();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  //API
  getOrdersList(page: number) {
    this.dataTableList = [];

    this.orderService.apiOrdersGet(this.accessToken, '0', page).subscribe(
      (res) => {
        console.log('check res', res);
        if (res) {
          this.totalProduct = res.count;
          this.pageLength = res.count;
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

  getMyAddressList() {
    this.addressService.apiAddressGet(this.accessToken).subscribe(
      (res) => {
        if (res) {
          console.log('check res', res);
          this.addressList = res.results;
        }
      },
      (error) => {
        console.log('Have a error when get address: ', error);
      }
    );
  }

  //GHN-API
  getAllProvinceOfVietNam() {
    this.ghnLocationService.apiProvincesGet().subscribe(
      (res) => {
        if (res && res.code === 200) {
          console.log('check res', res);
          this.provinceList = res.data;
        }
      },
      (error) => {
        console.log('Have a error when get GHN province : ', error);
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

  onProductPageChange(data: any) {
    this.page = data.pageIndex + 1;
    this.getOrdersList(this.page);
  }
}
