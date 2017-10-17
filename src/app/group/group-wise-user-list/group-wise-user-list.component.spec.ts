import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupWiseUserListComponent } from './group-wise-user-list.component';

describe('GroupWiseUserListComponent', () => {
  let component: GroupWiseUserListComponent;
  let fixture: ComponentFixture<GroupWiseUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupWiseUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupWiseUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
