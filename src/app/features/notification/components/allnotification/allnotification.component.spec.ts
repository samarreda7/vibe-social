import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllnotificationComponent } from './allnotification.component';

describe('AllnotificationComponent', () => {
  let component: AllnotificationComponent;
  let fixture: ComponentFixture<AllnotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllnotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllnotificationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
