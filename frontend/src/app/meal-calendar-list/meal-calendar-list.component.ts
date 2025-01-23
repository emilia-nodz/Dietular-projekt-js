import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meal } from '../models/meal.model';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-meal-calendar-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-calendar-list.component.html',
  styleUrl: './meal-calendar-list.component.css'
})
export class MealListComponent {
  meals: Meal[] = [];
  filteredMeals: Meal[] = [];
  @Input() assignedMeals: Meal[] = []; 
  @Output() interest = new EventEmitter<Meal>();

  constructor(private mealService: MealService) {
    this.mealService.getMeals().subscribe((data: Meal[]) => {
      this.meals = data;
      this.filterMeals();
    });
  }

  ngOnChanges(): void {
    this.filterMeals();
  }

  filterMeals(): void {
    this.filteredMeals = this.meals.filter(
      meal => !this.assignedMeals.some(assigned => assigned.id === meal.id)
    );
  }


  selectMeal(meal: Meal): void {
    this.interest.emit(meal);
  }
}
