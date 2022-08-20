import { Product } from './../../../model/product';
import { ProductService } from './../../../services/product.service';
import { Category } from './../../../model/category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  categoryList: Category[] = [];
  productList: Product[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
    this.getProductList();
  }

  getCategoryList() {
    this.categoryService.apiCategoryGet().subscribe((res) => {
      this.categoryList = res.results;
    });
  }

  getProductList() {
    this.productService.apiProductGet().subscribe((res) => {
      this.productList = res.results;

      // for (let i = 0; i < this.productList.length; i++) {
      //   for (let j = 0; j < this.categoryList.length; j++) {
      //     for (let k = 0; k < this.productList[i].categories.length; j++) {
      //       if (this.productList[i].categories[k] === this.categoryList[j].id) {
      //         this.productList[i].category_name = this.categoryList[j].name;
      //       }
      //     }
      //   }
      // }
    });
  }
}
