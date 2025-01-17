import { Component } from '@angular/core';
import { Meal, MealToAdd } from '../models/meal.model';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MealService } from '../services/meal.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { positiveNumbersValidator } from '../numbers-validator';

@Component({
  selector: 'app-add-meal',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './add-meal.component.html',
  styleUrl: './add-meal.component.css'
})
export class AddMealComponent {
  meals: Meal[] = [];
  itemList: Item[] = [];

  formModel: FormGroup;
  formBuilder: any;

  constructor(private itemService: ItemService, private mealService: MealService, private fb: FormBuilder, private router: Router) {
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.itemList = data; 
    });

    this.mealService.getMeals().subscribe((data: Meal[]) => {
      this.meals = data;
    })

    this.formModel = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      desc: ['', Validators.required],
      portionNo: ['', [Validators.required, positiveNumbersValidator]],
      portionWe: ['', [Validators.required, positiveNumbersValidator]],
      portionCal: ['', [Validators.required, positiveNumbersValidator]],
      items: [[],],
    });
  }

  addMeal(items: number[], name: string, description: string, numberOfPortions: number, portionWeight: number, caloriesPerPortion: number): void {
    const newMeal: MealToAdd = {items, name, description, numberOfPortions, portionWeight, caloriesPerPortion } as MealToAdd;
    console.log(newMeal);
    this.router.navigate(['/meal-list-component']);
    this.mealService.addMeal(newMeal).subscribe((meal) => {
      console.log(newMeal);
      this.meals.push(meal);
    });
  }
  
  submitForm() {
    console.log("in submit form");
    this.addMeal(
      this.formModel.value.items,
      this.formModel.value.name,
      this.formModel.value.desc,
      this.formModel.value.portionNo,
      this.formModel.value.portionWe,
      this.formModel.value.portionCal
    );
  }
}
