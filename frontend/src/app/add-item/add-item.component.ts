import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemService } from '../services/item.service';
import { Item, ItemToAdd } from '../models/item.model'
import { AllergenService } from '../services/allergen.service';
import { Allergen } from '../models/allergen.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  items: Item[] = [];
  allergensList: Allergen[] = [];

  formModel: FormGroup;
  formBuilder: any;

  constructor(private itemService: ItemService, private allergenService: AllergenService, private fb: FormBuilder, private router: Router) {
    this.allergenService.getAllergens().subscribe((alData: Allergen[]) => {
      this.allergensList = alData;
    })
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.items = data; 
    });

    this.formModel = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      desc: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      cal: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      protein: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      carbs: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      fats: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      allergens: [[],],
    });
  }

  addItem(allergens: number[], name: string, description: string, weight: number, calories: number, carbohydrates: number, proteins: number, fats: number): void {
    const newItem: ItemToAdd = {allergens, name, description, weight, calories, carbohydrates, proteins, fats } as ItemToAdd;
    console.log(newItem);
    this.router.navigate(['/item-list-component']);
    this.itemService.addItem(newItem).subscribe((item) => {
      console.log(newItem);
      this.items.push(item);
    });
  }

  
  submitForm() {
    this.addItem(
      this.formModel.value.allergens,
      this.formModel.value.name,
      this.formModel.value.desc,
      this.formModel.value.weight,
      this.formModel.value.cal,
      this.formModel.value.carbs,
      this.formModel.value.protein,
      this.formModel.value.fats
    );
  }
  
}