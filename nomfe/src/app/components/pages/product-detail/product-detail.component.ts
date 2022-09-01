import { User } from 'src/app/model/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Option } from 'src/app/model/option';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../../model/product';
import { OptionService } from './../../../services/option.service';
import { CustomCurrencyPipe } from '../../shared/pipe/currency.pipe';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productDetail: Product = {};
  productId: string = '';
  productQuantity: number = 1;
  optionItem: Option = {};
  commentForm = new FormGroup({
    rate: new FormControl(3),
    comment: new FormControl('', Validators.required),
  });
  accessToken: string = '';
  isCurrentUserLogged: boolean = false;

  constructor(
    private route: ActivatedRoute,
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

  getProductDetail() {
    this.productService.apiProductByIdGet(this.productId).subscribe((res) => {
      console.log('check res detail', res);
      this.productDetail = res;
    });
  }

  checkLoggedCurrentUser() {
    const currentUser = JSON.parse(<any>localStorage.getItem('current_user'));
    //User is not logged
    if (
      Object.keys(currentUser).length === 0 &&
      Object.keys(currentUser) === Object.prototype
    ) {
      console.log('User is not logged');
    } else {
      console.log('User is logged');
      this.isCurrentUserLogged = true;
    }
  }

  //Add product to cart
  onProductQuantityChange(data: any) {
    this.productQuantity = data;
  }

  onAddProductToCart() {
    if (Object.keys(this.optionItem).length === 0) {
      this.toastr.warning('Vui lòng chọn option cho sản phẩm');
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
      .apiOptionAddToCartPost(this.accessToken, this.productId, payload)
      .subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Thêm vào giỏ hàng thành công');
          }
        },
        (error) => {
          console.log('check error add to cart', error);
          this.toastr.error('Thêm vào giỏ hàng thất bại');
        }
      );
  }
  //=====

  //Push comment
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
            this.toastr.success('Đăng bình luận thành công');
            this.commentForm.controls.comment.setValue('');
            this.getProductDetail();
          }
        },
        (error) => {
          console.log('check error add to comment', error);
          this.toastr.success('Đăng bình luận thất bại');
        }
      );
  }
}
