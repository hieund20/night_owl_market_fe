import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { GhnLocationService } from 'src/app/services/ghn-services/ghn-location.service';

@Component({
  selector: 'app-modal-add-address',
  templateUrl: './modal-add-address.component.html',
  styleUrls: ['./modal-add-address.component.scss'],
})
export class ModalAddAddressComponent implements OnInit {
  accessToken: string = '';
  //GHN
  provinceList: any[] = [];
  districtList: any[] = [];
  wardList: any[] = [];
  //Address Form
  addressForm = new FormGroup({
    province_id: new FormControl(null, Validators.required),
    district_id: new FormControl(null, Validators.required),
    ward_id: new FormControl(null, Validators.required),
    street: new FormControl('', Validators.required),
  });

  constructor(
    private addressService: AddressService,
    private ghnLocationService: GhnLocationService,
    public dialogRef: MatDialogRef<ModalAddAddressComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getAllProvinceOfVietNam();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  //API
  postMyAddress() {
    this.addressService
      .apiAddressPost(this.accessToken, this.addressForm.value)
      .subscribe(
        (res) => {
          if (res) {
            console.log('check res', res);
            this.toastr.success('Thêm mới địa chỉ nhận hàng thành công');
            this.dialogRef.close(true);
          }
        },
        (error) => {
          this.toastr.error('Thêm mới địa chỉ nhận hàng không thành công');
          console.log('Have a error when post address: ', error);
        }
      );
  }

  //GHN-API
  getAllProvinceOfVietNam() {
    this.ghnLocationService.apiProvincesGet().subscribe(
      (res) => {
        if (res && res.code === 200) {
          this.provinceList = res.data;
        }
      },
      (error) => {
        console.log('Have a error when get GHN province : ', error);
      }
    );
  }

  getAllDistrictOfVietNam(provinceId: number) {
    this.ghnLocationService.apiDistrictsGet(provinceId).subscribe(
      (res) => {
        if (res && res.code === 200) {
          this.districtList = res.data;
        }
      },
      (error) => {
        console.log('Have a error when get GHN district : ', error);
      }
    );
  }

  getAllWardOfVietNam(districtId: number) {
    this.ghnLocationService.apiWardsGet(districtId).subscribe(
      (res) => {
        if (res && res.code === 200) {
          this.wardList = res.data;
        }
      },
      (error) => {
        console.log('Have a error when get GHN ward : ', error);
      }
    );
  }

  //Others

  onChangeProvince(data: number) {
    this.getAllDistrictOfVietNam(data);
  }

  onChangeDistrict(data: number) {
    this.getAllWardOfVietNam(data);
  }

  onSubmitAddAddress() {
    this.postMyAddress();
  }
}
