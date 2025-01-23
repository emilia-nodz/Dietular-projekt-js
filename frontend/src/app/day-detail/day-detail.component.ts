import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Day } from '../models/day.model';
import { Item } from '../models/item.model';
import { ItemListComponent } from '../item-calendar-list/item-calendar-list.component';
import { MealListComponent } from '../meal-calendar-list/meal-calendar-list.component';
import { DayService } from '../services/day.service';
import { Meal } from '../models/meal.model';




@Component({
  selector: 'app-day-detail',
  standalone: true,
  imports: [CommonModule, ItemListComponent, MealListComponent],
  templateUrl: './day-detail.component.html',
  styleUrl: './day-detail.component.css'
})
export class DayDetailComponent {
  @Input() day: Day | null = null;
  tempItems: Item[] = [];
  tempMeals: Meal[] = [];
  showItemDropdown = false;
  showMealDropdown = false;

  constructor(private dayService: DayService) { }

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
      console.log('Item added to temporary list:', item);
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
