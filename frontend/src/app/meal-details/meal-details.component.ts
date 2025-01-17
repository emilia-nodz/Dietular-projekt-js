import { Component, Input } from '@angular/core';
import { MealService } from '../services/meal.service';
import { Meal } from '../models/meal.model';
@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.css'
})
export class MealDetailsComponent {

  meals: Meal[] = [];

@Input() index: number | undefined;

  constructor(private mealService: MealService) {
    this.mealService.getMeals().subscribe((data: Meal[]) => {
      this.meals = data;
    });
  }


}