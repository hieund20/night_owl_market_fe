import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  //Tab
  tabIndex: number = 0;
  currentUrl: string = '';

  constructor() {}

  ngOnInit(): void {}
  
  //Others
  onTabChange(e: any) {
    this.tabIndex = e.index;
  }
}
