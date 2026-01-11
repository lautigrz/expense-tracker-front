import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGasto } from './add-gasto';

describe('AddGasto', () => {
  let component: AddGasto;
  let fixture: ComponentFixture<AddGasto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGasto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGasto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
