import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattingLayoutComponent } from './chatting-layout.component';

describe('ChattingLayoutComponent', () => {
  let component: ChattingLayoutComponent;
  let fixture: ComponentFixture<ChattingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChattingLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChattingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
