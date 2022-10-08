import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { ModalPurchaseViewOrderComponent } from '../../modal-purchase-view-order/modal-purchase-view-order.component';

@Component({
  selector: 'app-all-purchase-tab',
  templateUrl: './all-purchase-tab.component.html',
  styleUrls: ['./all-purchase-tab.component.scss'],
})
export class AllPurchaseTabComponent implements OnInit {
  accessToken: string = '';
  dataTableList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTableList);
  displayedColumns: string[] = [
    'id',
    'buyer_name',
    'buyer_phone',
    'cost',
    'total_shipping_fee',
    'actions',
  ];
  page: number = 1;
  pageLength: number = 0;

  constructor(private orderService: OrdersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getOrderList(this.page);
  }

  //API
  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getOrderList(page: number) {
    this.dataTableList = [];
    this.orderService.apiOrdersGet(this.accessToken, null, 0, page).subscribe(
      (res) => {
        if (res) {
          res.results.forEach((el: any) => {
            this.dataTableList.push({
              id: el.id,
              buyer_name: `${el.store.first_name} ${el.store.last_name}`,
              buyer_phone: el.store.phone_number,
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

  //Others
  onPageChange(data: any) {
    this.page = data.pageIndex + 1;
    this.getOrderList(this.page);
  }

  onOpenModalViewOrderInformation(id: number) {
    const dialogRef = this.dialog.open(ModalPurchaseViewOrderComponent, {
      width: '700px',
      data: { orderId: id },
    });
  }
}
