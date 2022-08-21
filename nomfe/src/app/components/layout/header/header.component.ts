import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User = {};
  isCurrentUserLogged: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getLoggedCurrentUser();
  }

  getLoggedCurrentUser() {
    this.currentUser = JSON.parse(<any>localStorage.getItem('current_user'));
    //User is not logged
    if (
      Object.keys(this.currentUser).length === 0 &&
      Object.keys(this.currentUser) === Object.prototype
    ) {
      console.log('User is not logged');
    } else {
      console.log('User is logged');
      this.isCurrentUserLogged = true;
    }
  }

  onLogOut() {
    localStorage.clear();
    this.isCurrentUserLogged = false;
    this.currentUser = {};

    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 1000);
  }
}
