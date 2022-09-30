import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User = {};
  isCurrentUserLogged: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  //API
  getCurrentUser() {
    const accessToken = <string>localStorage.getItem('access_token');
    if (accessToken) {
      this.userService.apiCurrentUserGet(accessToken).subscribe(
        (res) => {
          if (res) {
            localStorage.setItem('current_user', JSON.stringify(res));
            this.currentUser = res;
            this.isCurrentUserLogged = true;
          }
        },
        (err) => {
          this.isCurrentUserLogged = false;
        }
      );
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
