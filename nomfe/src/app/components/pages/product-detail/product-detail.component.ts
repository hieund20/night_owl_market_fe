import { Product } from './../../../model/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productDetail: Product = {};
  productId: string = '';
  productQuantity: number = 1;
  commentForm = new FormGroup({
    rating: new FormControl(3),
  });

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = <string>this.route.snapshot.paramMap.get('id');
    this.getProductDetail();
  }

  getProductDetail() {
    this.productService.apiProductByIdGet(this.productId).subscribe((res) => {
      console.log('check res detail', res);
      this.productDetail = res;
    });
  }

  onProductQuantityChange(data: any) {
    this.productQuantity = data;
    console.log('check quantity', this.productQuantity);
  }
}
