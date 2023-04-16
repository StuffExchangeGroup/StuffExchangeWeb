import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSwapComponent } from './popup-swap.component';

describe('PopupSwapComponent', () => {
  let component: PopupSwapComponent;
  let fixture: ComponentFixture<PopupSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSwapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
