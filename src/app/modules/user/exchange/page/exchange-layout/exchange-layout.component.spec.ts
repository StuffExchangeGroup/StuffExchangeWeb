import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeLayoutComponent } from './exchange-layout.component';

describe('ExchangeLayoutComponent', () => {
  let component: ExchangeLayoutComponent;
  let fixture: ComponentFixture<ExchangeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
