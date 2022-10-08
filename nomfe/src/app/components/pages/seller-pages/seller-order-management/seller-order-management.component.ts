import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { ModalPurchaseViewOrderComponent } from '../../purchase/modal-purchase-view-order/modal-purchase-view-order.component';

@Component({
  selector: 'app-seller-order-management',
  templateUrl: './seller-order-management.component.html',
  styleUrls: ['./seller-order-management.component.scss'],
})
export class SellerOrderManagementComponent implements OnInit {
  accessToken: string = '';
  dataTableList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTableList);
  displayedColumns: string[] = [
    'id',
    'customer_name',
    'customer_phone',
    'cost',
    'total_shipping_fee',
    'actions',
  ];
  page: number = 1;
  pageLength: number = 0;

  constructor(
    private orderService: OrdersService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getUnAcceptOrderList(this.page);
  }

  //API
  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getUnAcceptOrderList(page: number) {
    this.dataTableList = [];
    this.orderService.apiOrdersGet(this.accessToken, 1, 1, page).subscribe(
      (res) => {
        if (res) {
          res.results.forEach((el: any) => {
            this.dataTableList.push({
              id: el.id,
              customer_name: `${el.customer.first_name} ${el.customer.last_name}`,
              customer_phone: el.customer.phone_number,
              cost: el.cost,
              total_shipping_fee: el.total_shipping_fee,
            });
          });
          this.dataSource.data = this.dataTableList;
        }
      },
      (error) => {
        console.log('Have a error when get product list', error);
      }
    );
  }

  onAcceptOrder(id: number) {
    this.orderService.apiAcceptOrderGet(this.accessToken, id).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Xác nhận đơn hàng thành công');
          this.getUnAcceptOrderList(this.page);
        }
      },
      (err) => {
        console.log('Have a error when accept order', err);
        this.toastr.error('Xác nhận đơn hàng không thành công');
      }
    );
  }

  onCancelOrder(id: number) {
    this.orderService.apiCancelOrderGet(this.accessToken, id).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Hủy đơn hàng thành công');
          this.getUnAcceptOrderList(this.page);
        }
      },
      (err) => {
        console.log('Have a error when accept order', err);
        this.toastr.error('Hủy đơn hàng không thành công');
      }
    );
  }

  //Others
  onPageChange(data: any) {
    this.page = data.pageIndex + 1;
    this.getUnAcceptOrderList(this.page);
  }

  onOpenModalViewOrderInformation(id: number) {
    const dialogRef = this.dialog.open(ModalPurchaseViewOrderComponent, {
      width: '700px',
      data: { orderId: id },
    });
  }
}
