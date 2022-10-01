import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoinTabComponent } from './add-coin-tab.component';

describe('AddCoinTabComponent', () => {
  let component: AddCoinTabComponent;
  let fixture: ComponentFixture<AddCoinTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCoinTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCoinTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
