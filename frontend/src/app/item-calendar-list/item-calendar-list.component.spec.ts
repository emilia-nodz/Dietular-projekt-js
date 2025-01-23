import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCalendarListComponent } from './item-calendar-list.component';

describe('ItemCalendarListComponent', () => {
  let component: ItemCalendarListComponent;
  let fixture: ComponentFixture<ItemCalendarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCalendarListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCalendarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
