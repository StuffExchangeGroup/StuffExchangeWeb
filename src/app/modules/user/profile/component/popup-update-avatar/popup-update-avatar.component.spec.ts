import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdateAvatarComponent } from './popup-update-avatar.component';

describe('PopupUpdateAvatarComponent', () => {
  let component: PopupUpdateAvatarComponent;
  let fixture: ComponentFixture<PopupUpdateAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUpdateAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUpdateAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
