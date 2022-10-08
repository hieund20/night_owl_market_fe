import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  //Ngr store
  cart$: Observable<number> | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<{ cart: number }>
  ) {
    this.cart$ = store.select('cart');
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.onDetectCartChange();
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

  //Others
  onLogOut() {
    localStorage.clear();
    this.isCurrentUserLogged = false;
    this.currentUser = {};

    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 1000);
  }

  onDetectCartChange() {
    this.store.select('cart').subscribe((res) => {
      this.getCurrentUser();
    });
  }
}
