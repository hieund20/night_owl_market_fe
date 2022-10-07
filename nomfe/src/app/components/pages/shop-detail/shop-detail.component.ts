import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
})
export class ShopDetailComponent implements OnInit {
  accessToken: string = '';
  userId: number = 0;
  shopDetail: any = null;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getUserIdFromURL();
    this.getProductListOfUser();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getUserIdFromURL() {
    this.userId = Number.parseInt(
      <string>this.route.snapshot.paramMap.get('id')
    );
  }

  getProductListOfUser() {
    this.userService
      .apiProductsOfUserGet(this.accessToken, this.userId)
      .subscribe(
        (res) => {
          if (res) {
            this.shopDetail = res;
          }
        },
        (err) => {
          console.log('Some thing is wrong', err);
        }
      );
  }
}
