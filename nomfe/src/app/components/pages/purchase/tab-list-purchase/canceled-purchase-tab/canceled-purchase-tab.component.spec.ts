import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledPurchaseTabComponent } from './canceled-purchase-tab.component';

describe('CanceledPurchaseTabComponent', () => {
  let component: CanceledPurchaseTabComponent;
  let fixture: ComponentFixture<CanceledPurchaseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanceledPurchaseTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanceledPurchaseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
