import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewOrderComponent } from './modal-view-order.component';

describe('ModalViewOrderComponent', () => {
  let component: ModalViewOrderComponent;
  let fixture: ComponentFixture<ModalViewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
