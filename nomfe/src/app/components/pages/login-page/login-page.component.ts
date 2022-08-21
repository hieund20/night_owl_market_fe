import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  emailPattern = '^[A-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z]{2,4}$';
  // phonePattern = '^[0-9]*$';

  // emailEncrypt: string = '';
  // encryptPassword = '@123RAPTOR!@#&^';

  loginForm = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.emailPattern),
      ])
    ),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmitLogin() {
    const controls = <any>this.loginForm.controls;

    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.authService.apiTokenPost(this.loginForm.value).subscribe(
      (res) => {
        if (res) {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          
          console.log('Đăng nhập thành công', res);
          this.toastr.success('Đăng nhập thành công');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        }
      },
      (error) => {
        console.log('Đăng nhập thất bại', error);
        if (error.status === 401) {
          this.toastr.error('Email hoặc mật khẩu không đúng');
        }
      }
    );
  }
}
