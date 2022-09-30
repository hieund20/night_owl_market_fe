import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from './../../../model/category';
import { Product } from './../../../model/product';
import { ProductService } from './../../../services/product.service';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  categoryList: Category[] = [];
  productList: Product[] = [];
  cateId: number = 0;
  page: number = 1;
  pageLength: number = 0;

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // this.getCurrentUser();
    this.getCategoryList();
    this.getProductList(this.page);
  }

  getCategoryList() {
    this.categoryService.apiCategoryGet().subscribe((res) => {
      this.categoryList = res.results;
    });
  }

  getProductList(page?: number, cateId?: number) {
    const searchKey = this.searchForm.controls.search.value;
    if (searchKey !== '') {
      this.productService
        .apiProductGet(page, cateId, <string>searchKey)
        .subscribe((res) => {
          this.productList = res.results;
          this.pageLength = res.count;
        });
    } else {
      if (this.cateId !== 0) {
        this.productService.apiProductGet(page, cateId).subscribe((res) => {
          this.productList = res.results;
          this.pageLength = res.count;
        });
      } else {
        this.productService.apiProductGet(page).subscribe((res) => {
          this.productList = res.results;
          this.pageLength = res.count;
        });
      }
    }
  }

  onProductPageChange(data: any) {
    this.page = data.pageIndex + 1;
    this.getProductList(this.page, this.cateId);
  }

  onFilterProductByProduct(cateId: any) {
    this.cateId = <number>cateId;
    this.page = 1;
    this.getProductList(this.page, this.cateId);
  }

  onSearchProduct() {
    this.page = 1;
    this.getProductList(this.page, this.cateId);
  }
}
