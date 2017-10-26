import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCompleteComponent } from './user-profile-complete.component';

describe('UserProfileCompleteComponent', () => {
  let component: UserProfileCompleteComponent;
  let fixture: ComponentFixture<UserProfileCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
