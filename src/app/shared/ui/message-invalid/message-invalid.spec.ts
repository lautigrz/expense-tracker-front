import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInvalid } from './message-invalid';

describe('MessageInvalid', () => {
  let component: MessageInvalid;
  let fixture: ComponentFixture<MessageInvalid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageInvalid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageInvalid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
