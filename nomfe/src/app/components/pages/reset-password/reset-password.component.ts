import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  firstFormGroup = new FormGroup({ email: new FormControl() });
  secondFormGroup = new FormGroup({
    code: new FormControl(),
  });
  thirdFormGroup = new FormGroup({
    new_password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
    confirm_password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
  });

  userId: number = 0;

  accessToken: string = '';

  constructor(
    private userService: UserService,
    public toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserIdWithEmail();
  }

  //API
  getUserIdWithEmail() {
    this.userService
      .apiGetUserWithIdEmailPost(this.firstFormGroup.value)
      .subscribe(
        (res) => {
          if (res) {
            this.userId = res.user_id;
            this.toastr.success('Gửi yêu cầu thành công');

            this.sendResetCodeToEmail(this.userId);
          }
        },
        (err) => {
          this.toastr.error('Gửi yêu cầu không thành công');
          console.log('Something is wrong', err);
        }
      );
  }

  sendResetCodeToEmail(userId: number) {
    this.userService.apiSendResetCodeToEmailGet(userId).subscribe(
      (res) => {
        if (res) {
          console.log('check res', res);
        }
      },
      (err) => {
        console.log('Something is wrong', err);
      }
    );
  }

  getTokenByUserIdAndResetCode() {
    let body = {
      user_id: this.userId,
      code: this.secondFormGroup.controls.code.value,
    };
    this.userService.apiGetTokenByUserIdAndResetCodePost(body).subscribe(
      (res) => {
        if (res) {
          this.accessToken = res.access;
        }
      },
      (err) => {
        console.log('Something is wrong', err);
      }
    );
  }

  postResetPassword() {
    this.userService
      .apiResetPasswordPost(this.accessToken, this.thirdFormGroup.value)
      .subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Đặt lại mật khẩu thành công');
            setTimeout(() => {
              this.router.navigateByUrl('/auth/login');
            }, 1000);
          }
        },
        (err) => {
          console.log('Some thing is wrong', err);
          this.toastr.error('Đặt lại mật khẩu không thành công');
        }
      );
  }
}
