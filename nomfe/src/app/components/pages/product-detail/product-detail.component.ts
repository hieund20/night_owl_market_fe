import { addToCart } from './../../store/actions/cart.actions';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Option } from 'src/app/model/option';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../../model/product';
import { OptionService } from './../../../services/option.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  accessToken: string = '';
  isCurrentUserLogged: boolean = false;

  productDetail: Product = {};
  productId: string = '';
  productQuantity: number = 1;

  optionUnitInStock: number = 2;
  optionItem: Option = {};
  optionSelected: any = {};

  commentForm = new FormGroup({
    rate: new FormControl(3),
    comment: new FormControl('', Validators.required),
  });

  carouselImageList: any = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ cart: number }>,
    private productService: ProductService,
    private optionService: OptionService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productId = <string>this.route.snapshot.paramMap.get('id');
    this.getProductDetail();
    this.getAccessToken();
    this.checkLoggedCurrentUser();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  //Product
  getProductDetail() {
    this.productService.apiProductByIdGet(this.productId).subscribe((res) => {
      this.productDetail = res;
      this.carouselImageList = [res.picture];
    });
  }

  checkLoggedCurrentUser() {
    const currentUser = JSON.parse(<any>localStorage.getItem('current_user'));
    //User is not logged
    if (
      Object.keys(currentUser).length === 0 &&
      Object.keys(currentUser) === Object.prototype
    ) {
    } else {
      this.isCurrentUserLogged = true;
    }
  }

  //Add product to cart
  onProductQuantityChange(data: string) {
    if (Object.keys(this.optionSelected).length === 0) {
      this.toastr.warning('B???n ch??a ch???n option cho s???n ph???m');
      return;
    }
    if (data === 'ADD') {
      if (this.optionSelected.unit_in_stock === this.productQuantity) {
        this.toastr.warning('S???n ph???m c??n l???i trong kho kh??ng ?????');
        return;
      }
      this.productQuantity++;
    } else {
      if (this.productQuantity === 1) return;
      this.productQuantity--;
    }
  }

  onChangeOptions(data: MatRadioChange) {
    this.optionSelected = data.value;
    this.optionUnitInStock = this.optionSelected.unit_in_stock;
    this.productQuantity = 1;

    let carouselImageListTemp: any = [];
    data.value.picture_set.forEach((el: any) => {
      carouselImageListTemp.push(el.image);
    });
    this.carouselImageList = [...carouselImageListTemp];
  }

  onAddProductToCart() {
    if (Object.keys(this.optionItem).length === 0) {
      this.toastr.warning('Vui l??ng ch???n option cho s???n ph???m');
      return;
    }

    const payload = {
      product_option: {
        base_product: {
          name: this.productDetail.name,
          is_available: this.productDetail.is_available,
          description: this.productDetail.description,
          categories: this.productDetail.categories?.map((el) => {
            return el.id;
          }),
        },
        unit: this.optionItem.unit,
        unit_in_stock: this.optionItem.unit_in_stock,
        price: this.optionItem.price,
        weight: this.optionItem.weight,
        height: this.optionItem.height,
        width: this.optionItem.width,
        length: this.optionItem.length,
      },
      quantity: this.productQuantity,
    };
    this.optionService
      .apiOptionAddToCartPost(this.accessToken, this.optionSelected.id, payload)
      .subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Th??m v??o gi??? h??ng th??nh c??ng');
            this.store.dispatch(addToCart());
          }
        },
        (error) => {
          console.log('check error add to cart', error);
          this.toastr.error('Th??m v??o gi??? h??ng th???t b???i');
        }
      );
  }
  //=====

  //Comment
  onPostComment() {
    const controls = <any>this.commentForm.controls;

    if (this.commentForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.productService
      .apiProductAddCommentPost(
        this.accessToken,
        this.productId,
        this.commentForm.value
      )
      .subscribe(
        (res) => {
          if (res) {
            this.toastr.success('????ng b??nh lu???n th??nh c??ng');
            this.commentForm.controls.comment.setValue('');
            this.getProductDetail();
          }
        },
        (error) => {
          console.log('check error add to comment', error);
          this.toastr.success('????ng b??nh lu???n th???t b???i');
        }
      );
  }
}
