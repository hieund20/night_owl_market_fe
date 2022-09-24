import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  tabIndex: number = 0;
  currentUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUrl();
    this.handleSwitchTab();
  }

  getCurrentUrl() {
    this.currentUrl = this.router.url;
  }

  handleSwitchTab() {
    let tabUrlValue = this.currentUrl.substring(
      this.currentUrl.indexOf('#') + 1
    );
    switch (tabUrlValue) {
      case 'all':
        this.tabIndex = 0;
        break;
      case 'pending':
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
        window.location.hash = 'all';
        break;
      case 1:
        window.location.hash = 'pending';
        break;
      default:
        break;
    }
  }
}
