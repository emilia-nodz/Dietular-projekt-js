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
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
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
    this.formModel.patchValue({
      name: this.currentItem.name,
      desc: this.currentItem.description,
      weight: this.currentItem.weight,
      cal: this.currentItem.calories,
      protein: this.currentItem.proteins,
      carbs: this.currentItem.carbohydrates,
      fats: this.currentItem.fats,
      allergens: this.currentItem.allergens
    });
  }

  get editItem(): ItemToAdd {
    return this.oldItem;
  }

  @Input() id: number | undefined; 

  @Output() editInList: EventEmitter<ItemToAdd> = new EventEmitter();

  constructor(
    private allergenService: AllergenService,
    private itemService: ItemService,
    private fb: FormBuilder
  ) {
    this.allergenService.getAllergens().subscribe((alData: Allergen[]) => {
      this.allergensList = alData;
    });

    
    this.itemService.getItemsToAdd().subscribe((data: ItemToAdd[]) => {
      this.items = data;
      if (this.id !== undefined) {
        
        let item = this.items.find(i => i.id === this.id);
        if (item) {
          this.editItem = item;
        }
      }
    });

    this.formModel = this.fb.group({
      name: new FormControl('', [Validators.maxLength(50)]),
      desc: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(1)]],
      cal: ['', [Validators.required, Validators.min(1)]],
      protein: ['', [Validators.required, Validators.min(1)]],
      carbs: ['', [Validators.required, Validators.min(1)]],
      fats: ['', [Validators.required, Validators.min(1)]],
      allergens: [[],],
    });
  }

  submitForm() {
    console.log('submitting ', this.formModel.value.name);

    if (this.id !== undefined) {
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
    this.formModel.patchValue({
      name: this.oldItem.name,
      desc: this.oldItem.description,
      weight: this.oldItem.weight,
      cal: this.oldItem.calories,
      protein: this.oldItem.proteins,
      carbs: this.oldItem.carbohydrates,
      fats: this.oldItem.fats
    });

    this.editInList.emit();
  }
}
