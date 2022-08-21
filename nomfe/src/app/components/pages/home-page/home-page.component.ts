import { UserService } from './../../../services/user.service';
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
  page: number = 1;
  pageLength: number = 0;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCategoryList();
    this.getProductList(this.page);
  }

  getCategoryList() {
    this.categoryService.apiCategoryGet().subscribe((res) => {
      this.categoryList = res.results;
    });
  }

  getProductList(page: number) {
    this.productService.apiProductGet(page).subscribe((res) => {
      this.productList = res.results;
      this.pageLength = res.count;
      console.log('check product list', this.productList);
    });
  }

  onProductPageChange(data: any) {
    this.page = data.pageIndex + 1;
    this.getProductList(this.page);
  }

  getCurrentUser() {
    const accessToken = <string>localStorage.getItem('access_token');
    if (accessToken) {
      this.userService.apiCurrentUserGet(accessToken).subscribe((res) => {
        if (res) {
          localStorage.setItem('current_user', JSON.stringify(res));
        }
      });
    }
  }
}
