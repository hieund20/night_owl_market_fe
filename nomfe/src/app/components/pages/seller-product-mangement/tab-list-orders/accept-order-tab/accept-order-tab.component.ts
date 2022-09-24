import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accept-order-tab',
  templateUrl: './accept-order-tab.component.html',
  styleUrls: ['./accept-order-tab.component.scss'],
})
export class AcceptOrderTabComponent implements OnInit {
  accessToken: string = '';
  dataTableList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTableList);
  displayedColumns: string[] = [
    'id',
    'customer_name',
    'customer_phone',
    'cost',
    'total_shipping_fee',
    'action',
  ];
  page: number = 1;
  pageLength: number = 0;

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getUnAcceptOrderList(this.page);
  }

  //API
  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getUnAcceptOrderList(page: number) {
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
          console.log('check res', res);
        }
      },
      (err) => {
        console.log('Have a error when accept order', err);
      }
    );
  }

  //Others
  onPageChange(data: any) {
    this.page = data.pageIndex + 1;
    this.getUnAcceptOrderList(this.page);
  }
}
