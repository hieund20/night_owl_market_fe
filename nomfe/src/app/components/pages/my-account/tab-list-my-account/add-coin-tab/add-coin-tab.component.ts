import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-coin-tab',
  templateUrl: './add-coin-tab.component.html',
  styleUrls: ['./add-coin-tab.component.scss'],
})
export class AddCoinTabComponent implements OnInit {
  accessToken: string = '';
  cashinCoin = new FormControl('0', Validators.required);

  constructor(
    private userService: UserService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  //API
  onAddCasingCoin() {
    if (Number.parseInt(<string>this.cashinCoin.value) <= 0) {
      this.toastr.warning('Số coin phải lớn hơn 0');
      return;
    }

    this.spinner.show();
    let body = {
      amount: Number.parseInt(<string>this.cashinCoin.value),
    };
    this.userService.apiCashingPost(this.accessToken, body).subscribe(
      (res) => {
        this.spinner.hide();
        window.open(res.pay_url, '_self');
      },
      (err) => {
        this.toastr.error('Nạp NOM Coin không thành công');
      }
    );
  }
}
