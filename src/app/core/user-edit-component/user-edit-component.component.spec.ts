import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponentComponent } from './user-edit-component.component';

describe('UserEditComponentComponent', () => {
  let component: UserEditComponentComponent;
  let fixture: ComponentFixture<UserEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
