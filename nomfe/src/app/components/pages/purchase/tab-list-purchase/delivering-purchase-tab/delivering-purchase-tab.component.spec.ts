import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveringPurchaseTabComponent } from './delivering-purchase-tab.component';

describe('DeliveringPurchaseTabComponent', () => {
  let component: DeliveringPurchaseTabComponent;
  let fixture: ComponentFixture<DeliveringPurchaseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveringPurchaseTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveringPurchaseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
