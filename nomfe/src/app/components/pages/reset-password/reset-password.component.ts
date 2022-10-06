import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    new_password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
    confirm_password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
  });

  constructor() {}

  ngOnInit(): void {}
}
