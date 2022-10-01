import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountTabComponent } from './my-account-tab.component';

describe('MyAccountTabComponent', () => {
  let component: MyAccountTabComponent;
  let fixture: ComponentFixture<MyAccountTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAccountTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
