import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinChatComponent } from './pin-chat.component';

describe('PinChatComponent', () => {
  let component: PinChatComponent;
  let fixture: ComponentFixture<PinChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
