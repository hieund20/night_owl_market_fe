import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptOrderTabComponent } from './accept-order-tab.component';

describe('AcceptOrderTabComponent', () => {
  let component: AcceptOrderTabComponent;
  let fixture: ComponentFixture<AcceptOrderTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptOrderTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptOrderTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
