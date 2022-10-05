import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedPhoneTabComponent } from './verified-phone-tab.component';

describe('VerifiedPhoneTabComponent', () => {
  let component: VerifiedPhoneTabComponent;
  let fixture: ComponentFixture<VerifiedPhoneTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedPhoneTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedPhoneTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
