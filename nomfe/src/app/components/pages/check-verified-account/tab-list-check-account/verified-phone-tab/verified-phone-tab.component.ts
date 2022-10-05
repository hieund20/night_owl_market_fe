import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-verified-phone-tab',
  templateUrl: './verified-phone-tab.component.html',
  styleUrls: ['./verified-phone-tab.component.scss'],
})
export class VerifiedPhoneTabComponent implements OnInit {
  accessToken: string = '';
  isShowSendRequestCodeMessage: boolean = false;
  requestCodeMessage: string = '';
  code = new FormControl(null, Validators.required);

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
  }

  //API
  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  sendToVerifiedPhone() {
    this.isShowSendRequestCodeMessage = true;
    this.userService.apiSendVerifiedCodeToPhoneGet(this.accessToken).subscribe(
      (res) => {
        if (res) {
          this.requestCodeMessage =
            'Gửi yêu cầu thành công ! Hãy kiểm tra email và nhận mã xác thực của bạn.';
        } else {
          this.requestCodeMessage =
            'Gửi yêu cầu không thành công ! Hãy thử lại sau.';
        }
      },
      (err) => {
        this.requestCodeMessage =
          'Gửi yêu cầu không thành công ! Hãy thử lại sau.';
      }
    );
  }

  checkVerifiedPhone() {
    let body = {
      code: this.code.value,
    };

    this.userService
      .apiCheckVerifiedCodeToPhonePost(this.accessToken, body)
      .subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Xác thực số điện thoại thành công');
          }
        },
        (err) => {
          this.toastr.error('Xác thực số điện thoại không thành công');
        }
      );
  }
}
