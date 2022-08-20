import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmitLogin() {
    this.authService.apiTokenPost(this.loginForm.value).subscribe(
      (res) => {
        if (res) {
          console.log('Đăng nhập thành công', res);
        }
      },
      (error) => {
        console.log('Đăng nhập thất bại', error);
      }
    );
  }
}
