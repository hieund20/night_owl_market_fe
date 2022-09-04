import { ModalAddProductComponent } from './modal-add-product/modal-add-product.component';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-seller-product-mangement',
  templateUrl: './seller-product-mangement.component.html',
  styleUrls: ['./seller-product-mangement.component.scss'],
})
export class SellerProductMangementComponent implements OnInit {
  accessToken: string = '';
  dataTableList: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTableList);
  displayedColumns: string[] = [
    'id',
    'name',
    'min_price',
    'sold_amount',
    'action',
  ];
  page: number = 1;
  pageLength: number = 0;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getProductList(this.page);
  }

  //API
  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getProductList(page?: number) {
    this.productService.apiProductGet(page).subscribe(
      (res) => {
        this.dataTableList = res.results;
        this.dataSource.data = this.dataTableList;
        this.pageLength = res.count;
      },
      (error) => {
        console.log('Have a error when get product list', error);
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
        this.getProductList();
      }
    });
  }
}