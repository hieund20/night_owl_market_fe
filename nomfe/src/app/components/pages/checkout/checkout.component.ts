import { Router } from '@angular/router';
import { ModalAddAddressComponent } from './modal-add-address/modal-add-address.component';
import { MatDialog } from '@angular/material/dialog';
import { AddressService } from './../../../services/address.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { PaymentMethods } from '../../constants/payment-methods';
import { GhnLocationService } from 'src/app/services/ghn-services/ghn-location.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  accessToken: string = '';
  dataTableList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTableList);
  displayedColumns: string[] = ['store_name', 'cost', 'total_shipping_fee'];
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

  //Address
  myAddress: string = '';
  // addressList: any[] = [];
  // addressForm = new FormGroup({
  //   address: new FormControl('', Validators.required),
  // });
  // isEditAddressForm: boolean = false;

  constructor(
    private orderService: OrdersService,
    private addressService: AddressService,
    private ghnLocationService: GhnLocationService,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getOrdersList(this.page);
    this.getMyAddress();
    // this.getMyAddressList();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getMyAddress() {
    let currentUser = JSON.parse(<string>localStorage.getItem('current_user'));
    console.log(currentUser);
    this.myAddress = currentUser.address.full_address;
  }

  //API
  getOrdersList(page: number) {
    this.dataTableList = [];
    this.orderService.apiOrdersGet(this.accessToken, 0, 0, page).subscribe(
      (res) => {
        if (res) {
          this.totalProduct = res.count;
          this.pageLength = res.count;
          res.results.forEach((el: any) => {
            this.dataTableList.push({
              id: el.id,
              store_name: `${el.store.last_name} ${el.store.first_name}`,
              cost: el.cost,
              total_shipping_fee: el.total_shipping_fee,
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

  // getMyAddressList() {
  //   this.addressService.apiAddressGet(this.accessToken).subscribe(
  //     (res) => {
  //       if (res) {
  //         res.results.forEach((el: any, index: number) => {
  //           this.addressList.push(
  //             `${el.street}, ${el.ward_id}, ${el.district_id},
  //             ${el.province_id}, ${el.country}`
  //           );
  //         });
  //         this.addressForm.controls.address.setValue(this.addressList[0]);
  //       }
  //     },
  //     (error) => {
  //       console.log('Have a error when get address: ', error);
  //     }
  //   );
  // }

  postOrderCheckout() {
    this.spinner.show();
    let orderIdList = [];
    for (let i = 0; i < this.dataTableList.length; i++) {
      orderIdList.push(this.dataTableList[i].id);
    }

    let list_voucher: any = {};
    orderIdList.forEach((el) => {
      list_voucher[el] = 'null';
    });

    const body = {
      list_voucher: {
        ...list_voucher,
      },
      payment_type: this.paymentMethodForm.controls.method.value,
    };
    this.orderService.apiOrdersCheckoutPost(this.accessToken, body).subscribe(
      (res) => {
        if (res) {
          //Payment with MoMo
          if (this.paymentMethodForm.controls.method.value === 1) {
            this.spinner.hide();
            window.open(res.pay_url, '_self');
          } else {
            //Payment with another
            setTimeout(() => {
              this.spinner.hide();
              this.router.navigateByUrl('/purchase#pending');
            }, 1000);
          }
        } else {
          this.toastr.error('Đặt hàng không thành công');
        }
      },
      (err) => {
        this.toastr.error('Đặt hàng không thành công');
        console.log('have a error when post order checkout', err);
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

  onProductPageChange(data: any) {
    this.page = data.pageIndex + 1;
    this.getOrdersList(this.page);
  }

  // onOpenModalAddAddress() {
  //   const dialogRef = this.dialog.open(ModalAddAddressComponent, {
  //     width: '700px',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.getMyAddressList();
  //     }
  //   });
  // }
}
