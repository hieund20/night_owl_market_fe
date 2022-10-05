import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-verified-account',
  templateUrl: './check-verified-account.component.html',
  styleUrls: ['./check-verified-account.component.scss'],
})
export class CheckVerifiedAccountComponent implements OnInit {
  //Tab
  tabIndex: number = 0;
  currentUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUrl();
    this.handleSwitchTab();
  }

  //API
  getCurrentUrl() {
    this.currentUrl = this.router.url;
  }

  //Others
  handleSwitchTab() {
    let tabUrlValue = this.currentUrl.substring(
      this.currentUrl.indexOf('#') + 1
    );
    switch (tabUrlValue) {
      case 'email':
        this.tabIndex = 0;
        break;
      case 'phone':
        this.tabIndex = 1;
        break;
      default:
        break;
    }
  }

  onTabChange(e: any) {
    this.tabIndex = e.index;
    switch (this.tabIndex) {
      case 0:
        window.location.hash = 'email';
        break;
      case 1:
        window.location.hash = 'phone';
        break;
      default:
        break;
    }
  }
}
