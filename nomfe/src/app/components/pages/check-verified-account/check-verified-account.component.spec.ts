import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckVerifiedAccountComponent } from './check-verified-account.component';

describe('CheckVerifiedAccountComponent', () => {
  let component: CheckVerifiedAccountComponent;
  let fixture: ComponentFixture<CheckVerifiedAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckVerifiedAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckVerifiedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
