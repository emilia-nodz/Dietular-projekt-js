import { ChangeDetectionStrategy, Component, EventEmitter, Input, model, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Day, DayToAdd } from '../models/day.model';
import { DayComponent } from '../day/day.component';
import { DayService } from '../services/day.service';
import { Meal } from '../models/meal.model';
import { Item } from '../models/item.model';
import { ItemListComponent } from '../item-calendar-list/item-calendar-list.component';
import { MealListComponent } from '../meal-calendar-list/meal-calendar-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule, DayComponent, CommonModule, ItemListComponent, MealListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  days: Day[] = [];
  selected = model<Date | null>(null);
  @Output() daySelected = new EventEmitter<Day>();
  day: Day | undefined;

  constructor(private dayService: DayService) { }

  convert(selected: Date) {

  console.log(selected);
      const date = selected;
      const newDay: DayToAdd = {date} as DayToAdd;
      this.dayService.addDay(newDay).subscribe((day) => {
        console.log(newDay);
        this.day = day;
      })
    
  }
  // emitDay(day: Day): void {
  //   this.dayService.getDayByDate(day.date).subscribe(
  //     (data) => {
  //       this.selected = data;
  //       console.log('Day fetchd: ', this.selected);
  //       this.daySelected.emit(this.selected);
  //     }
  //   )
  // }

  // @Input() day: Day | undefined;
  tempItems: Item[] = [];
  tempMeals: Meal[] = [];
  showItemDropdown = false;
  showMealDropdown = false;


  itemClick(): void {
    this.showItemDropdown = !this.showItemDropdown;
  }

  mealClick(): void {
    this.showMealDropdown = !this.showMealDropdown;
  }

  addItemToDay(item: Item): void {
    if (this.day) {
      if (!this.day.item_details) {
        this.day.item_details = [];
      }

      this.day.item_details.push(item);
      this.tempItems.push(item);
    }
  }

  removeItemFromDay(item: Item): void {
    if (this.day) {
      if (!this.day.item_details) {
        this.day.item_details = [];
      }
      this.day.item_details = this.day.item_details.filter(i => i.id !== item.id);
      console.log('Item removed from day:', item);
    }
  }

  addMealToDay(meal: Meal): void {
    if (this.day) {
      if (!this.day.meal_details) {
        this.day.meal_details = [];
      }

      this.day.meal_details.push(meal);
      this.tempMeals.push(meal);
      console.log('Item added to temporary list:', meal);
    }
  }

  removeMealFromDay(meal: Meal): void {
    if (this.day) {
      if (!this.day.meal_details) {
        this.day.meal_details = [];
      }
      this.day.meal_details = this.day.meal_details.filter(i => i.id !== meal.id);
      console.log('Item removed from day:', meal);
    }
  }

  saveDay(): void {
    if (!this.day) {
      console.warn('No day to save');
      return;
    }

    if (!Array.isArray(this.day.item_details)) {
      this.day.item_details = [];
    }
    if (!Array.isArray(this.day.meal_details)) {
      this.day.meal_details = [];
    }

    const updatedDay = {
      id: this.day.id,
      date: this.day.date,
      items: this.day.item_details.map(item => item.id), 
      meals: this.day.meal_details.map(meal => meal.id),
    };

    this.dayService.updateDay(updatedDay).subscribe(
      (updatedDayFromServer) => {
        console.log('Day updated:', updatedDayFromServer);

      },
      (error) => {
        console.error('Error updating day:', error);
      }
    );
  }

}
