import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostModelComponent } from './edit-post-model.component';

describe('EditPostModelComponent', () => {
  let component: EditPostModelComponent;
  let fixture: ComponentFixture<EditPostModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPostModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostModelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
