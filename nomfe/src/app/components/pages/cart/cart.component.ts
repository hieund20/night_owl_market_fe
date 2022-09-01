import { Router } from '@angular/router';
import { OrdersService } from './../../../services/orders.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  accessToken: string = '';
  dataTableList: any[] = [];
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<any>(this.dataTableList);
  displayedColumns: string[] = ['select', 'name', 'unit', 'price', 'action'];

  countProduct: number = 0;
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initVariable();
    this.getAccessToken();
    this.getCartGroupByOwner();
  }

  initVariable() {}

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getCartGroupByOwner() {
    this.dataTableList = [];

    this.cartService.apiCartGroupByOwnerGet(this.accessToken).subscribe(
      (res) => {
        console.log('check res', res);
        res.forEach((el: any) => {
          this.dataTableList.push({
            id: el.id,
            name: el.product_option.base_product.name,
            unit: el.product_option.unit,
            price: el.product_option.price,
          });
        });
        this.dataSource.data = this.dataTableList;
      },
      (error) => {
        console.log('error when get cart group by owner', error);
      }
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    //Count product
    this.countProduct = this.selection.selected.length;
    //Calculation total price
    this.totalPrice = 0;
    this.selection.selected.forEach((el) => {
      return (this.totalPrice += Number.parseInt(el.price));
    });

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  deleteProductInCart(id: number) {
    this.cartService.apiCartGroupByOwnerDelete(this.accessToken, id).subscribe(
      (res) => {
        this.toastr.success('Xóa sản phẩm trong giỏ thành công');

        this.getCartGroupByOwner();
      },
      (error) => {
        this.toastr.success('Xóa sản phẩm trong giỏ không thành công');
        console.log('error when delete cart group by owner', error);
      }
    );
  }

  onDeleteManyProductInCart() {
    if (this.selection.selected.length === 0) {
      this.toastr.warning('Bạn chưa chọn sản phẩm');
    } else {
      this.selection.selected.forEach((el) => {
        this.deleteProductInCart(el.id);
      });
    }
  }

  onBuyProductInCart() {
    if (this.selection.selected.length === 0) {
      this.toastr.warning('Bạn chưa chọn sản phẩm');
    } else {
      console.log('check product', this.selection.selected);
      let payload = {
        list_cart: [],
      };

      this.selection.selected.forEach((el) => {
        return payload.list_cart.push(<never>el.id);
      });

      this.orderService.apiOrdersPost(this.accessToken, payload).subscribe(
        (res) => {
          if (res) {
            console.log('post orders success: ', res.message);
            this.getCartGroupByOwner();
            this.toastr.success('Chuyển trang thanh toán ...');
            setTimeout(() => {
              this.router.navigate(['checkout']);
            }, 3000);
          }
        },
        (error) => {
          console.log('error when post orders', error);
          this.toastr.error('Có lỗi xảy ra');
        }
      );
    }
  }
}
