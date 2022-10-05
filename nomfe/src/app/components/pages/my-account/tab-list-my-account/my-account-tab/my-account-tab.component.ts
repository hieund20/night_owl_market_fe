import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

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
  //Change password
  changingPasswordForm = new FormGroup({
    current_password: new FormControl(null, Validators.required),
    new_password: new FormControl(null, Validators.required),
    confirm_password: new FormControl(null, Validators.required),
  });

  constructor(
    private userService: UserService,
    public toastr: ToastrService,
    private router: Router
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
    } else {
      this.isEditUserForm = false;
      (this.userForm as FormGroup).removeControl('email');

      this.userService
        .apiUserPatch(
          this.accessToken,
          this.currentUser.id,
          this.userForm.value
        )
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
    }
  }

  onSubmitChangingPasswordForm() {
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

  //Others
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
}
