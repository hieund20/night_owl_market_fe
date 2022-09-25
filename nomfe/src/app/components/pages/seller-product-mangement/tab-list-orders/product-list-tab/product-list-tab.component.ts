import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { ModalAddProductComponent } from './../../modal-add-product/modal-add-product.component';

@Component({
  selector: 'app-product-list-tab',
  templateUrl: './product-list-tab.component.html',
  styleUrls: ['./product-list-tab.component.scss'],
})
export class ProductListTabComponent implements OnInit {
  accessToken: string = '';
  currentUser: any = {};
  dataTableList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTableList);
  displayedColumns: string[] = ['id', 'name', 'price', 'sold_amount', 'action'];
  page: number = 1;
  pageLength: number = 0;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getCurrentUser();
    this.getProductList(this.page);
  }

  //API
  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}');
  }

  getProductList(page: number) {
    this.dataTableList = [];
    this.productService
      .apiProductGet(page, null, null, this.currentUser.id)
      .subscribe(
        (res) => {
          if (res) {
            res.results.forEach((el: any) => {
              this.dataTableList.push({
                id: el.id,
                name: el.name,
                price: el.min_price,
                sold_amount: el.sold_amount,
              });
            });
            this.dataSource.data = this.dataTableList;
          }
        },
        (err) => {
          console.log('Have a error when get product list', err);
        }
      );
  }

  deleteProduct(id: number) {
    this.productService.apiProductDelete(this.accessToken, id).subscribe(
      (res) => {
        this.toastr.success('Xóa sản phẩm thành công');
        this.getProductList(this.page);
      },
      (err) => {
        this.toastr.error('Xóa sản phẩm không thành công');
        console.log('have a error when delete product', err);
      }
    );
  }

  //Others
  onProductPageChange(data: any) {
    this.page = data.pageIndex + 1;
    this.getProductList(this.page);
  }

  onOpenAddProductModal(isAdd: boolean) {
    const dialogRef = this.dialog.open(ModalAddProductComponent, {
      width: '800px',
      data: { isAdd: isAdd },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProductList(this.page);
      }
    });
  }
}
