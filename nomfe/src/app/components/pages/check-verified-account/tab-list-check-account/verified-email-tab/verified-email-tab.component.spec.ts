import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedEmailTabComponent } from './verified-email-tab.component';

describe('VerifiedEmailTabComponent', () => {
  let component: VerifiedEmailTabComponent;
  let fixture: ComponentFixture<VerifiedEmailTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedEmailTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedEmailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
