import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalGastos } from './total-gastos';

describe('TotalGastos', () => {
  let component: TotalGastos;
  let fixture: ComponentFixture<TotalGastos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalGastos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalGastos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
