import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GhnLocationService } from 'src/app/services/ghn-services/ghn-location.service';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-my-account-tab',
  templateUrl: './my-account-tab.component.html',
  styleUrls: ['./my-account-tab.component.scss'],
})
export class MyAccountTabComponent implements OnInit {
  accessToken: string = '';
  currentUser: any = null;
  //User detail
  userForm = new FormGroup({
    email: new FormControl(null),
    first_name: new FormControl(null, Validators.required),
    last_name: new FormControl(null, Validators.required),
    phone_number: new FormControl(null, Validators.required),
  });
  isEditUserForm: boolean = false;
  isEmailVerified: boolean = false;
  isPhoneVerified: boolean = false;

  addressForm = new FormGroup({
    province_id: new FormControl(null, Validators.required),
    district_id: new FormControl(null, Validators.required),
    ward_id: new FormControl(null, Validators.required),
    street: new FormControl(null, Validators.required),
  });
  //Change password
  changingPasswordForm = new FormGroup({
    current_password: new FormControl(null, Validators.required),
    new_password: new FormControl(null, Validators.required),
    confirm_password: new FormControl(null, Validators.required),
  });
  isShowErrorMessage: boolean = false;
  errorMessage: string = '';
  //GHN
  provinceList: any[] = [];
  districtList: any[] = [];
  wardList: any[] = [];

  provinceSelectedName: string = '';
  districtSelectedName: string = '';
  wardSelectedName: string = '';

  //Avatar
  isEditAvatar: boolean = false;
  imageAvatarFileList: any = [];
  imageAvatarBase64: string = '';
  fileList: File[] = [];

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    public toastr: ToastrService,
    private router: Router,
    private ghnLocationService: GhnLocationService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getCurrentUser();
  }

  initFormValue() {
    this.userForm.controls.email.setValue(this.currentUser.email);
    this.userForm.controls.first_name.setValue(this.currentUser.first_name);
    this.userForm.controls.last_name.setValue(this.currentUser.last_name);
    this.userForm.controls.phone_number.setValue(this.currentUser.phone_number);
    this.addressForm.controls.province_id.setValue(
      this.currentUser.address.province_id
    );
    // this.userForm.controls.district_id.setValue(
    //   this.currentUser.address.district_id
    // );
    // this.userForm.controls.ward_id.setValue(this.currentUser.address.ward_id);
    this.addressForm.controls.street.setValue(this.currentUser.address.street);
  }

  //API
  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getCurrentUser() {
    this.userService.apiCurrentUserGet(this.accessToken).subscribe(
      (res) => {
        if (res) {
          this.currentUser = res;
          this.initFormValue();
          this.checkEmailVerified();
          this.checkPhoneVerified();
        }
      },
      (err) => {
        console.log('Some thing is error', err);
      }
    );
  }

  onSubmitUserDetailForm(isEdit: boolean) {
    if (isEdit) {
      this.isEditUserForm = true;

      let isAvailable = this.userForm.contains('email');
      if (!isAvailable) {
        this.userForm.addControl('email', new FormControl(null));
      }
      this.initFormValue();
      this.getAllProvinceOfVietNam();
    } else {
      this.isEditUserForm = false;
      (this.userForm as FormGroup).removeControl('email');

      let body = {
        first_name: this.userForm.controls.first_name.value,
        last_name: this.userForm.controls.last_name.value,
        phone_number: this.userForm.controls.phone_number.value,
      };

      this.userService
        .apiUserPatch(this.accessToken, this.currentUser.id, body)
        .subscribe(
          (res) => {
            if (res) {
              this.getCurrentUser();
              this.toastr.success('Sửa thông tin tài khoản thành công');
            }
          },
          (err) => {
            this.toastr.error('Sửa thông tin tài khoản không thành công');
          }
        );
      this.onUpdateMyAddress();
    }
  }

  onUpdateMyAddress() {
    let body = {
      province_id: this.addressForm.controls.province_id.value,
      district_id: this.addressForm.controls.district_id.value,
      ward_id: this.addressForm.controls.ward_id.value,
      street: this.addressForm.controls.street.value,
      full_address: `${this.addressForm.controls.street.value}, ${this.wardSelectedName}, ${this.districtSelectedName}, ${this.provinceSelectedName}`,
    };

    this.addressService
      .apiAddressPatch(this.accessToken, this.currentUser.id, body)
      .subscribe(
        (res) => {
          if (res) {
            this.getCurrentUser();
          }
        },
        (err) => {
          console.log('Something is wrong', err);
        }
      );
  }

  onSubmitChangingPasswordForm() {
    if (
      this.changingPasswordForm.controls.new_password.value !==
      this.changingPasswordForm.controls.confirm_password.value
    ) {
      this.isShowErrorMessage = true;
      this.errorMessage = 'Mật khẩu và xác nhận mật khấu không trùng khớp !';
      return;
    }

    this.userService
      .apiUserChangePasswordPost(
        this.accessToken,
        this.changingPasswordForm.value
      )
      .subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Thay đổi mật khẩu thành công');
          }
        },
        (err) => {
          this.toastr.error('Thay đổi mật khẩu không thành công');
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

  //OTHERS
  onCloseForm() {
    this.isEditUserForm = false;
  }

  checkEmailVerified() {
    if (this.currentUser.email_verified) {
      this.isEmailVerified = true;
    }
  }

  checkPhoneVerified() {
    if (this.currentUser.phone_verified) {
      this.isPhoneVerified = true;
    }
  }

  onOpenVerifiedLink(type: string) {
    if (type === 'EMAIL') {
      this.router.navigateByUrl('/myaccount/verified#email');
    } else {
      this.router.navigateByUrl('/myaccount/verified#phone');
    }
  }

  onChangeProvince(data: number) {
    this.provinceSelectedName = this.provinceList.find(
      (el) => el.ProvinceID === data
    ).ProvinceName;

    this.getAllDistrictOfVietNam(data);
  }

  onChangeDistrict(data: number) {
    this.districtSelectedName = this.districtList.find(
      (el) => el.DistrictID === data
    ).DistrictName;

    this.getAllWardOfVietNam(data);
  }

  onChangeWard(data: number) {
    this.wardSelectedName = this.wardList.find(
      (el) => el.WardCode === data
    ).WardName;
  }

  //Avatar
  onEditAvatar(type: string) {
    if (type === 'EDIT') {
      this.isEditAvatar = true;
    } else if (type === 'CLOSE') {
      this.isEditAvatar = false;
      this.imageAvatarBase64 = '';
      this.imageAvatarFileList = [];
    } else {
      if (!this.imageAvatarBase64) {
        this.toastr.warning('Bạn chưa tải ảnh avatar lên');
      } else {
        let body = {
          image: this.imageAvatarBase64,
        };
        this.userService.apiChangeAvatarPatch(this.accessToken, body).subscribe(
          (res) => {
            if (res) {
              this.toastr.success('Cập nhật avatar thành công');
              this.isEditAvatar = false;
              this.getCurrentUser();
            }
          },
          (err) => {
            this.toastr.error('Cập nhật avatar không thành công');
          }
        );
      }
      console.log(this.imageAvatarBase64);
    }
  }

  onImageSelect(e: any) {
    this.imageAvatarFileList.push(...e.addedFiles);

    let file = e.addedFiles[0];
    let reader = new FileReader();
    reader.onload = this.handleImageReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }

  onImageRemove(e: any) {
    this.imageAvatarFileList.splice(this.fileList.indexOf(e), 1);
  }

  handleImageReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageAvatarBase64 = btoa(binaryString);
  }
}
