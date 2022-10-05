import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verified-email-tab',
  templateUrl: './verified-email-tab.component.html',
  styleUrls: ['./verified-email-tab.component.scss'],
})
export class VerifiedEmailTabComponent implements OnInit {
  accessToken: string = '';
  isShowSendRequestCodeMessage: boolean = false;
  requestCodeMessage: string = '';
  mail = new FormControl(null, Validators.required);

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

  sendToVerifiedEmail() {
    this.isShowSendRequestCodeMessage = true;
    this.userService.apiSendVerifiedCodeToEmailGet(this.accessToken).subscribe(
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

  checkVerifiedEmail() {
    let body = {
      code: this.mail.value,
    };

    this.userService
      .apiCheckVerifiedCodeToEmailPost(this.accessToken, body)
      .subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Xác thực email thành công');
          }
        },
        (err) => {
          this.toastr.error('Xác thực email không thành công');
        }
      );
  }
}
