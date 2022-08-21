import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  emailPattern = '^[A-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z]{2,4}$';
  phonePattern = '^[0-9]*$';

  registerForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.emailPattern),
      ])
    ),
    phone_number: new FormControl(
      '',
      Validators.compose([
        Validators.compose([
          Validators.required,
          Validators.pattern(this.phonePattern),
        ]),
      ])
    ),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmitRegister() {
    const controls = <any>this.registerForm.controls;

    if (this.registerForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.userService.apiUserPost(this.registerForm.value).subscribe(
      (res) => {
        console.log('check res', res);
        if (res) {
          console.log('Đăng ký thành công', res);
          this.toastr.success('Đăng ký thành công');
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        }
      },
      (error) => {
        console.log('Đăng ký thất bại', error);
        let stringError = '';
        Object.values(error.error).forEach(
          (element) => (stringError += `${element} \n`)
        );
        this.toastr.error(stringError);
      }
    );
  }
}
