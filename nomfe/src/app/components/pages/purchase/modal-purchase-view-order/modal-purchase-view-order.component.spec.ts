import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPurchaseViewOrderComponent } from './modal-purchase-view-order.component';

describe('ModalPurchaseViewOrderComponent', () => {
  let component: ModalPurchaseViewOrderComponent;
  let fixture: ComponentFixture<ModalPurchaseViewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPurchaseViewOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPurchaseViewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
