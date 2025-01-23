import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCalendarListComponent } from './meal-calendar-list.component';

describe('MealCalendarListComponent', () => {
  let component: MealCalendarListComponent;
  let fixture: ComponentFixture<MealCalendarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealCalendarListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealCalendarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
