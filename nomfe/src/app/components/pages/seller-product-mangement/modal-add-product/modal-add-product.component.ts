import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { map, Observable, startWith } from 'rxjs';
import { Category } from './../../../../model/category';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.scss'],
})
export class ModalAddProductComponent implements OnInit {
  accessToken: string = '';
  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    is_available: new FormControl(true),
    description: new FormControl(''),
    categories: new FormControl([]),
  });

  //Category Chip auto complete
  categoryList: Category[] = [];
  categories: Category[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  cateCtrl = new FormControl('');
  filteredCategories: Observable<Category[]>;

  @ViewChild('cateInput') cateInputRef: ElementRef<HTMLInputElement> | any;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ModalAddProductComponent>
  ) {
    //Category Chip auto complete
    this.filteredCategories = this.cateCtrl.valueChanges.pipe(
      startWith(null),
      map((cateName: string | null) =>
        cateName ? this._filter(cateName) : this.categoryList.slice()
      )
    );
  }

  ngOnInit(): void {
    this.getAccessToken();
    this.getCategoryList();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getCategoryList() {
    this.categoryService.apiCategoryGet().subscribe((res) => {
      this.categoryList = res.results;
      this.categories.push(this.categoryList[0]);
    });
  }

  //Others
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      let category: Category = {};
      this.categoryList.forEach((el) => {
        if (el.name?.includes(value)) {
          category = el;
        }
      });
      this.categories.push(category);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.cateCtrl.setValue(null);
  }

  remove(cate: Category): void {
    const index = this.categories.indexOf(cate);
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.value);
    this.cateInputRef.nativeElement.value = '';
    this.cateCtrl.setValue(null);
  }

  private _filter(value: string): Category[] {
    const filterValue = value.toLowerCase();

    return this.categoryList.filter((category) =>
      category?.name?.toLowerCase().includes(filterValue)
    );
  }

  onAddNewProduct() {
    const controls = <any>this.addProductForm.controls;

    if (this.addProductForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    let categoryPayload: (number | undefined)[] = [];
    this.categories.forEach((el) => {
      categoryPayload.push(el.id);
    });
    this.addProductForm.patchValue({
      categories: <any>categoryPayload,
    });

    console.log('check form', this.addProductForm.value);
    this.productService
      .apiProductPost(this.accessToken, this.addProductForm.value)
      .subscribe(
        (res) => {
          console.log('check res', res);
          if (res) {
            this.toastr.success('Thêm mới sản phẩm thành công');
            this.dialogRef.close(true);
          }
        },
        (error) => {
          console.log('Have errors when post product', error);
          this.toastr.error('Thêm mới sản phẩm không thành công');
        }
      );
  }
}
