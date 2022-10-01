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
  userForm = new FormGroup({
    first_name: new FormControl(null, Validators.required),
    last_name: new FormControl(null, Validators.required),
    phone_number: new FormControl(null, Validators.required),
  });
  isEditUserForm: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getCurrentUser();
  }

  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getCurrentUser() {
    this.userService.apiCurrentUserGet(this.accessToken).subscribe(
      (res) => {
        if (res) {
          this.currentUser = res;
        }
      },
      (err) => {
        console.log('Some thing is error', err);
      }
    );
  }
}
