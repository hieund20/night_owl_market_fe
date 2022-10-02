import { Component, OnInit } from '@angular/core';
import { _MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-received-purchase-tab',
  templateUrl: './received-purchase-tab.component.html',
  styleUrls: ['./received-purchase-tab.component.scss'],
})
export class ReceivedPurchaseTabComponent implements OnInit {
  accessToken: string = '';
  dataTableList: any[] = [];
  dataSource = new _MatTableDataSource<any>(this.dataTableList);
  displayedColumns: string[] = [
    'id',
    'buyer_name',
    'buyer_phone',
    'cost',
    'total_shipping_fee',
  ];
  page: number = 1;
  pageLength: number = 0;

  constructor(
    private orderService: OrdersService,
    public toastr: ToastrService
  ) {}

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
    this.orderService.apiOrdersGet(this.accessToken, 3, 0, page).subscribe(
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
          this.pageLength = res.count;
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
}
