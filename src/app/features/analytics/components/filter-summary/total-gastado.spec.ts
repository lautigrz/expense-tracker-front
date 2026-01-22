import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalGastado } from './total-gastado';

describe('TotalGastado', () => {
  let component: TotalGastado;
  let fixture: ComponentFixture<TotalGastado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalGastado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalGastado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
