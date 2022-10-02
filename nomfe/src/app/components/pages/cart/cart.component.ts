import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../../services/cart.service';
import { OrdersService } from './../../../services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CartComponent implements OnInit {
  accessToken: string = '';
  dataTableList: any[] = [];
  // selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<any>(this.dataTableList);
  displayedColumns: string[] = ['select', 'seller_name', 'expand'];
  expandedElement: any | null;
  selectedProduct: any[] = [];

  countProduct: number = 0;
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getCartGroupByOwner();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  //API
  getCartGroupByOwner() {
    this.dataTableList = [];

    this.cartService.apiCartGroupByOwnerGet(this.accessToken).subscribe(
      (res) => {
        res.forEach((el: any) => {
          let productListClone: any = [];
          el.carts.forEach((item: any) => {
            productListClone.push({
              cartId: item.id,
              quantity: item.quantity,
              name: item.product_option.base_product.name,
              price: item.product_option.price,
              unit: item.product_option.unit,
            });
          }),
            this.dataTableList.push({
              id: el.id,
              seller_name: `${el.first_name} ${el.last_name}`,
              product_list: [...productListClone],
            });
        });
        this.dataSource.data = this.dataTableList;
      },
      (error) => {
        console.log('error when get cart group by owner', error);
      }
    );
  }

  deleteProductInCart(id: number) {
    this.cartService.apiCartDelete(this.accessToken, id).subscribe(
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

  patchProductInCart(id: number, body: any) {
    const payload = {
      quantity: body.quantity,
    };

    this.cartService.apiCartPatch(this.accessToken, id, payload).subscribe(
      (res) => {
        console.log('success when patch product in cart: ', res);
        this.getCartGroupByOwner();
      },
      (error) => {
        console.log('error when patch product in cart: ', error);
      }
    );
  }

  onChangeProductQuantityInCart(event: any, id: number) {
    let quantity = event.target.value;
    if (quantity == 0) {
    }
    let body = {
      quantity: quantity,
    };
    this.patchProductInCart(id, body);
  }

  onDeleteManyProductInCart() {
    if (this.selectedProduct.length === 0) {
      this.toastr.warning('Bạn chưa chọn sản phẩm');
    } else {
      this.selectedProduct.forEach((el) => {
        this.deleteProductInCart(el.cartId);
      });
    }
  }

  onBuyProductInCart() {
    if (this.selectedProduct.length === 0) {
      this.toastr.warning('Bạn chưa chọn sản phẩm');
    } else {
      this.spinner.show();
      let orderIdList: any = [];
      this.selectedProduct.forEach((el) => {
        orderIdList.push(el.cartId);
      });

      let payload = {
        list_cart: [...orderIdList],
      };

      this.orderService.apiOrdersPost(this.accessToken, payload).subscribe(
        (res) => {
          if (res) {
            this.getCartGroupByOwner();
            setTimeout(() => {
              this.spinner.hide();
              this.router.navigate(['checkout']);
            }, 2000);
          }
        },
        (error) => {
          console.log('error when post orders', error);
          this.toastr.error('Có lỗi xảy ra');
        }
      );
    }
  }

  onSelectProduct(el: any) {
    if (this.selectedProduct.find((item: any) => item.cartId === el.cartId)) {
      let index = this.selectedProduct.findIndex((item) => item === el.cartId);
      this.selectedProduct.splice(index, 1);
      this.countProduct = this.selectedProduct.length;
    } else {
      this.selectedProduct.push(el);
      this.countProduct = this.selectedProduct.length;
    }

    this.totalPrice = 0;
    this.selectedProduct.forEach((el) => {
      this.totalPrice += el.price * el.quantity;
    });
  }

  //Handle Mat-table Selection
  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;

  //   //Count product
  //   this.countProduct = this.selection.selected.length;
  //   //Calculation total price
  //   this.totalPrice = 0;
  //   this.selection.selected.forEach((el) => {
  //     return (this.totalPrice += Number.parseInt(el.price) * el.quantity);
  //   });

  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // toggleAllRows() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }

  //   this.selection.select(...this.dataSource.data);
  // }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: any): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
  //     row.position + 1
  //   }`;
  // }
}
