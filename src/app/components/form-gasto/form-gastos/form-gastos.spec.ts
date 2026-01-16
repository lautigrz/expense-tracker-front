import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGastos } from './form-gastos';

describe('FormGastos', () => {
  let component: FormGastos;
  let fixture: ComponentFixture<FormGastos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGastos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGastos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
