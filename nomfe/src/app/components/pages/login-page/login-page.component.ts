import { UserService } from './../../../services/user.service';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgxSpinnerService } from 'ngx-spinner';

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
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  //API
  onSubmitLogin() {
    this.spinner.show();

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

          this.spinner.hide();
          this.toastr.success('Đăng nhập thành công');
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          }, 3000);
        }
      },
      (error) => {
        if (error.status === 401) {
          this.toastr.error('Email hoặc mật khẩu không đúng');
        }
      }
    );
  }

  onLoginWithGoogleFirebase() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (res: any) => {
        if (res) {
          let idToken = res.credential?.idToken;
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
            this.loginWithGoogleApp(idToken);
          }, 2000);
        }
      },
      (err) => {
        console.log('Something is wrong', err);
      }
    );
  }

  loginWithGoogleApp(idTokenGG: string) {
    let body = {
      id_token: idTokenGG,
    };
    this.userService.apiLoginWithGooglePost(body).subscribe(
      (res) => {
        if (res) {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);

          this.toastr.success('Đăng nhập thành công');
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          }, 3000);
        }
      },
      (err) => {
        let googleUserInformation = {
          email: err.error.email,
        };
        this.router.navigate([
          '/auth/register',
          { email: googleUserInformation.email },
        ]);

        this.toastr.error(
          'Đăng nhập bằng Google vào hệ thống không thành công'
        );
      }
    );
  }
}
