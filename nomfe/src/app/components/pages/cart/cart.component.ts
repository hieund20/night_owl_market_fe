import { Store } from '@ngrx/store';
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
import { deleteFromCart } from '../../store/actions/cart.actions';

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

  cartList: any = [];
  selectedProduct: any[] = [];

  countProduct: number = 0;
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private store: Store<{ cart: number }>,
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
    let cartListTemp: any = [];

    this.cartService.apiCartGroupByOwnerGet(this.accessToken).subscribe(
      (res) => {
        res.forEach((el: any) => {
          let productList: any = [];
          el.carts.forEach((item: any) => {
            productList.push({
              cartId: item.id,
              quantity: item.quantity,
              name: item.product_option.base_product.name,
              price: item.product_option.price,
              unit: item.product_option.unit,
            });
          });

          cartListTemp.push({
            sellerId: el.id,
            sellerFullName: `${el.last_name} ${el.first_name}`,
            sellerAvatar: el.avatar,
            productList: [...productList],
          });
        });

        console.log('cehck list', cartListTemp);
        this.cartList = [...cartListTemp];
      },
      (error) => {
        console.log('error when get cart group by owner', error);
      }
    );
  }

  deleteProductInCart(id: number) {
    this.cartService.apiCartDelete(this.accessToken, id).subscribe(
      (res) => {
        this.store.dispatch(deleteFromCart());
        this.toastr.success('X??a s???n ph???m trong gi??? th??nh c??ng');
        this.getCartGroupByOwner();
      },
      (error) => {
        this.toastr.success('X??a s???n ph???m trong gi??? kh??ng th??nh c??ng');
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
      this.toastr.warning('B???n ch??a ch???n s???n ph???m');
    } else {
      this.selectedProduct.forEach((el) => {
        this.deleteProductInCart(el.cartId);
      });
    }
  }

  onBuyProductInCart() {
    if (this.selectedProduct.length === 0) {
      this.toastr.warning('B???n ch??a ch???n s???n ph???m');
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
          this.toastr.error('C?? l???i x???y ra');
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
}
