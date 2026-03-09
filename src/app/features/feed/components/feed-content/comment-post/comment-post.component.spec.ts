import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPostComponent } from './comment-post.component';

describe('CommentPostComponent', () => {
  let component: CommentPostComponent;
  let fixture: ComponentFixture<CommentPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentPostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
