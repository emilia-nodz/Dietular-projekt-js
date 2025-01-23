import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  MealService } from '../services/meal.service';
import { CommonModule } from '@angular/common';
import { Meal } from '../models/meal.model';
import { MealToAdd } from '../models/meal.model';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { positiveNumbersValidator } from '../numbers-validator';

@Component({
  selector: 'app-edit-meal',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './edit-meal.component.html',
  styleUrl: './edit-meal.component.css'
})
export class EditMealComponent {
  items: MealToAdd[] = [];
  itemsList: Item[] = [];
  oldMeal!: MealToAdd;
  currentMeal!: MealToAdd;
  formModel: FormGroup;

  @Input() set editMeal(newMeal: MealToAdd) {
    this.oldMeal = newMeal;
    this.currentMeal = newMeal;
    this.formModel.patchValue({ name: this.currentMeal.name });
    this.formModel.patchValue({ desc: this.currentMeal.description });
    this.formModel.patchValue({ portionNo: this.currentMeal.numberOfPortions });
    this.formModel.patchValue({ portionWe: this.currentMeal.portionWeight});
    this.formModel.patchValue({ portionCal: this.currentMeal.caloriesPerPortion });
    this.formModel.patchValue({ items: this.currentMeal.items });
  }
  get editMeal(): MealToAdd {
    return this.oldMeal;
  }

  @Output() editInList: EventEmitter<MealToAdd>=new EventEmitter();

  @Input() index: number | undefined;

  constructor(private itemService: ItemService, private mealService: MealService, private fb: FormBuilder,) {
    this.itemService.getItems().subscribe((alData: Item[]) => {
      this.itemsList = alData;
    });
    this.mealService.getMealsToAdd().subscribe((data: MealToAdd[]) => {
      this.items = data; 
      console.table(this.items);
      if (this.index !== undefined) {
        let item = this.items[this.index];
        if (item) {
          this.editMeal = item; 
        }
      }
    });
    
    this.formModel = this.fb.group({
      name: new FormControl('',[ Validators.maxLength(50)]),
      desc: ['', Validators.required],
      portionNo: ['', [Validators.required, positiveNumbersValidator]],
      portionWe: ['', [Validators.required, positiveNumbersValidator]],
      portionCal: ['', [Validators.required, positiveNumbersValidator]],
      items: [[],],
    });
    
  }

  submitForm() {
    console.log('submitting ',this.formModel.value.name);
    if(this.index!==undefined){
      let updatedMeal: MealToAdd = {
        id: this.currentMeal.id,
        items: this.formModel.value.items,
        name: this.formModel.value.name,
        description: this.formModel.value.desc,
        numberOfPortions: this.formModel.value.portionNo,
        portionWeight: this.formModel.value.portionWe,
        caloriesPerPortion: this.formModel.value.portionCal
      };

      this.mealService.updateMeal(updatedMeal).subscribe(() => {
        console.log('Updated item:', updatedMeal);
        this.editInList.emit(updatedMeal);
        location.reload();
      });
    }
  }

  cancel() {
    this.formModel.patchValue({ name: this.oldMeal.name });
    this.formModel.patchValue({ desc: this.oldMeal.description });
    this.formModel.patchValue({ portionNo: this.oldMeal.numberOfPortions });
    this.formModel.patchValue({ portionWe: this.oldMeal.portionWeight});
    this.formModel.patchValue({ portionCal: this.oldMeal.caloriesPerPortion });

    this.editInList.emit();
  }
}
