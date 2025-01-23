import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item, ItemToAdd } from '../models/item.model';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { AllergenService } from '../services/allergen.service';
import { Allergen } from '../models/allergen.model';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent {
  items: ItemToAdd[] = [];
  allergensList: Allergen[] = [];
  oldItem!: ItemToAdd;
  currentItem!: ItemToAdd;
  formModel: FormGroup;

  @Input() set editItem(newItem: ItemToAdd) {
    this.oldItem = newItem;
    this.currentItem = newItem;
    this.formModel.patchValue({ name: this.currentItem.name });
    this.formModel.patchValue({ desc: this.currentItem.description });
    this.formModel.patchValue({ weight: this.currentItem.weight });
    this.formModel.patchValue({ cal: this.currentItem.calories });
    this.formModel.patchValue({ protein: this.currentItem.proteins });
    this.formModel.patchValue({ carbs: this.currentItem.carbohydrates });
    this.formModel.patchValue({ fats: this.currentItem.fats });
    this.formModel.patchValue({ allergens: this.currentItem.allergens });
  }
  get editItem(): ItemToAdd {
    return this.oldItem;
  }

  @Output() editInList: EventEmitter<ItemToAdd>=new EventEmitter();

  @Input() index: number | undefined;

  constructor(private allergenService: AllergenService, private itemService: ItemService, private fb: FormBuilder,) {
    this.allergenService.getAllergens().subscribe((alData: Allergen[]) => {
      this.allergensList = alData;
    });
    this.itemService.getItemsToAdd().subscribe((data: ItemToAdd[]) => {
      this.items = data; 
      console.table(this.items);
      if (this.index !== undefined) {
        let item = this.items[this.index];
        if (item) {
          this.editItem = item; 
        }
      }
    });
    
    this.formModel = this.fb.group({
      name: new FormControl('',[ Validators.maxLength(50)]),
      desc: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      cal: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      protein: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      carbs: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      fats: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      allergens: [[],],
    });
    
  }

  submitForm() {
    console.log('submitting ',this.formModel.value.name);
    if(this.index!==undefined){
      let updatedItem: ItemToAdd = {
        id: this.currentItem.id,
        allergens: this.formModel.value.allergens,
        name: this.formModel.value.name,
        description: this.formModel.value.desc,
        weight: this.formModel.value.weight,
        calories: this.formModel.value.cal,
        carbohydrates: this.formModel.value.carbs,
        proteins: this.formModel.value.protein,
        fats: this.formModel.value.fats
      };

      this.itemService.updateItem(updatedItem).subscribe(() => {
        console.log('Updated item:', updatedItem);
        this.editInList.emit(updatedItem);
        location.reload();
      });
    }
  }

  cancel() {
    this.formModel.patchValue({ name: this.oldItem.name });
    this.formModel.patchValue({ desc: this.oldItem.description });
    this.formModel.patchValue({ weight: this.oldItem.weight });
    this.formModel.patchValue({ cal: this.oldItem.calories });
    this.formModel.patchValue({ protein: this.oldItem.proteins });
    this.formModel.patchValue({ carbs: this.oldItem.carbohydrates });
    this.formModel.patchValue({ fats: this.oldItem.fats });

    this.editInList.emit();
  }
}
