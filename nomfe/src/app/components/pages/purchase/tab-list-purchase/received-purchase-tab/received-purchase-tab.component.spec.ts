import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedPurchaseTabComponent } from './received-purchase-tab.component';

describe('ReceivedPurchaseTabComponent', () => {
  let component: ReceivedPurchaseTabComponent;
  let fixture: ComponentFixture<ReceivedPurchaseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedPurchaseTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedPurchaseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
