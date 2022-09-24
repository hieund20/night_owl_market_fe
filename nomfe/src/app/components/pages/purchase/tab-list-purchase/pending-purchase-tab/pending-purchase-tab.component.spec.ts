import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPurchaseTabComponent } from './pending-purchase-tab.component';

describe('PendingPurchaseTabComponent', () => {
  let component: PendingPurchaseTabComponent;
  let fixture: ComponentFixture<PendingPurchaseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPurchaseTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingPurchaseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
