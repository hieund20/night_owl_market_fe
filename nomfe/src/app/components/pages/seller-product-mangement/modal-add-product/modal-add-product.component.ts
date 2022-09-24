import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { UploadService } from 'src/app/services/cloudinary-services/upload.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from './../../../../model/category';
import { OptionService } from './../../../../services/option.service';

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.scss'],
  providers: [UploadService],
})
export class ModalAddProductComponent implements OnInit {
  accessToken: string = '';

  //Product Add Form
  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    is_available: new FormControl(true),
    description: new FormControl(''),
    categories: new FormControl([]),
  });

  //Option Add Form
  productId: number = 0;
  addOptionForm = new FormGroup({
    unit: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });
  imageOptionList: any = [];
  fileList: File[] = [];
  img: CloudinaryImage | undefined;

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
    private optionService: OptionService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ModalAddProductComponent>,
    private uploadService: UploadService
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

  //API
  getCategoryList() {
    this.categoryService.apiCategoryGet().subscribe((res) => {
      this.categoryList = res.results;
      this.categories.push(this.categoryList[0]);
    });
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

    this.productService
      .apiProductPost(this.accessToken, this.addProductForm.value)
      .subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Thêm mới sản phẩm thành công');
            this.productId = res.id;
          }
        },
        (error) => {
          console.log('Have errors when post product', error);
          this.toastr.error('Thêm mới sản phẩm không thành công');
        }
      );
  }

  onAddNewOption() {
    const controls = <any>this.addOptionForm.controls;

    if (this.addOptionForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    let data = new FormData();
    this.fileList.forEach((el) => {
      let blob = new Blob([el]);
      this.imageOptionList.push(blob);
    });
    data.append('image_set', this.imageOptionList);
    data.append('unit', <string>this.addOptionForm.controls.unit.value);
    data.append('price', <string>this.addOptionForm.controls.price.value);

    // let body = {
    //   ...this.addOptionForm.value,
    //   image_set: [...this.fileList],
    // };

    this.optionService
      .apiOptionAddToProductPost(
        this.accessToken,
        this.productId.toString(),
        data
      )
      .subscribe(
        (res) => {
          if (res) {
            console.log('check res', res);
            this.toastr.success('Thêm option cho sản phẩm thành công');
          }
        },
        (error) => {
          console.log('Have error when post option', error);
          this.toastr.error('Thêm option cho sản phẩm không thành công');
        }
      );
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

  onCloseModal() {
    this.dialogRef.close(true);
  }

  onSelect(e: any) {
    this.fileList.push(...e.addedFiles);
  }

  onRemove(e: any) {
    this.fileList.splice(this.fileList.indexOf(e), 1);
  }

  onUpload() {
    console.log('check list', this.fileList);
    // if (!this.fileList[0]) {
    //   console.log('no file');
    // }

    // const data = new FormData();
    // data.append('upload_preset', 'xssjwxbn');
    // data.append('cloud_name', 'dwgjmgf6o');

    // for (let i = 0; i < this.fileList.length; i++) {
    //   data.append('file', this.fileList[i]);
    //   this.uploadService.uploadImage(data).subscribe((res: any) => {
    //     if (res) {
    //       this.imageOptionList.push(res?.secure_url);
    //     }
    //   });
    // }
  }
}
