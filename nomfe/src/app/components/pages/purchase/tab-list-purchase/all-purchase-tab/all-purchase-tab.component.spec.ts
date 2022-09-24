import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPurchaseTabComponent } from './all-purchase-tab.component';

describe('AllPurchaseTabComponent', () => {
  let component: AllPurchaseTabComponent;
  let fixture: ComponentFixture<AllPurchaseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPurchaseTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPurchaseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
