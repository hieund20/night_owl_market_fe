import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { PaymentMethods } from '../../constants/payment-methods';
import { ModalViewOrderComponent } from './modal-view-order/modal-view-order.component';

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
    'store_name',
    'cost',
    'total_shipping_fee',
    'voucher_apply',
    'actions',
  ];
  pageLength: number = 0;
  page: number = 1;
  totalProduct: number = 0;
  totalFinalPrice: number = 0;
  totalFinalShippingFee: number = 0;
  //Payment
  paymentMethodList = PaymentMethods;
  paymentMethodForm = new FormGroup({
    method: new FormControl(this.paymentMethodList[1].value),
  });
  isEditPaymentForm: boolean = false;
  paymentMethodShow: string = this.paymentMethodList[1].viewValue;
  //Address
  myAddress: string = '';
  //Voucher
  voucherList: any[] = [];

  constructor(
    private orderService: OrdersService,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getOrdersList(this.page);
    this.getMyAddress();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getMyAddress() {
    let currentUser = JSON.parse(<string>localStorage.getItem('current_user'));
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
              voucher_apply: el.voucher_apply,
            });
            this.totalFinalShippingFee += Number.parseInt(
              el.total_shipping_fee
            );
          });
          this.pageLength = res.count;
          this.dataSource.data = this.dataTableList;
          this.getOrderById(this.dataTableList[0].id);
          this.handleCounterTotalFinalPrice();
        }
      },
      (error) => {
        console.log('Something is wrong', error);
      }
    );
  }

  getOrderById(id: number) {
    this.orderService.apiOrderIdGet(this.accessToken, id).subscribe(
      (res) => {
        // console.log('check res', res);
      },
      (err) => {
        console.log('Something is wrong', err);
      }
    );
  }

  postOrderCheckout() {
    this.spinner.show();
    let orderIdList = [];
    for (let i = 0; i < this.dataTableList.length; i++) {
      orderIdList.push(this.dataTableList[i].id);
    }

    let list_voucher: any = {};

    if (!this.voucherList.length) {
      orderIdList.forEach((orderId) => {
        list_voucher[orderId] = 'NONE';
      });
    } else {
        orderIdList.forEach((orderId) => {
          this.voucherList.forEach((voucher) => {
            if (orderId === voucher.orderId) {
              list_voucher[orderId] = voucher.code;
            }
          });
        });
    }

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
          this.spinner.hide();
          this.toastr.error('Đặt hàng không thành công');
        }
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error('Đặt hàng không thành công');
        console.log('Something is wrong', err);
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

  onOpenModalViewOrderInformation(id: number) {
    const dialogRef = this.dialog.open(ModalViewOrderComponent, {
      width: '700px',
      data: { orderId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let rowIndex = this.dataTableList.findIndex((el: any) => el.id === id);
        let row = this.dataTableList.find((el: any) => el.id === id);
        let dataTableListClone = [...this.dataSource.data];

        //**Reset data in table
        //dataTableList is a temp variable
        this.dataSource.data = [...this.dataTableList];

        if (result.code !== 'NONE' && result.discount !== 0) {
          dataTableListClone.splice(rowIndex, 1, {
            ...row,
            voucher_apply: `"${result.code}" - Giảm ${result.discount}% đơn giá`,
            cost: row.cost * ((100 - result.discount) / 100),
          });

          this.handleAddOrRemoveVoucher({ ...result, orderId: id });
        } else {
          dataTableListClone = [...this.dataTableList];
          dataTableListClone.splice(rowIndex, 1, {
            ...row,
          });

          this.handleAddOrRemoveVoucher({ ...result, orderId: id });
        }

        this.dataSource.data = [...dataTableListClone];
        this.handleCounterTotalFinalPrice();
      }
    });
  }

  handleCounterTotalFinalPrice() {
    this.totalFinalPrice = 0;
    this.dataSource.data.forEach((el: any) => {
      this.totalFinalPrice += el.cost;
    });
  }

  handleAddOrRemoveVoucher(voucher: any) {
    let voucherListClone = [...this.voucherList];

    let isExistOrder = this.voucherList.find(
      (el: any) => el.orderId === voucher.orderId
    );

    if (isExistOrder) {
      let existVoucherIndex = this.voucherList.findIndex(
        (el: any) => el.orderId === voucher.orderId
      );

      voucherListClone.splice(existVoucherIndex, 1, voucher);
    } else {
      voucherListClone.push(voucher);
    }

    this.voucherList = voucherListClone;
  }
}
