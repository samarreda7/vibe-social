import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepicModelComponent } from './profilepic-model.component';

describe('ProfilepicModelComponent', () => {
  let component: ProfilepicModelComponent;
  let fixture: ComponentFixture<ProfilepicModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilepicModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilepicModelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
