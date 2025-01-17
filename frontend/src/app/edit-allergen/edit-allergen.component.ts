import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Allergen } from '../models/allergen.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllergenService } from '../services/allergen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-allergen',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-allergen.component.html',
  styleUrl: './edit-allergen.component.css'
})
export class EditAllergenComponent {
  allergens: Allergen[] = [];
  oldAllergen!: Allergen;
  currentAllergen!: Allergen;
  formModel: FormGroup;

  @Input() set editAllergen(newAllergen: Allergen) {
    this.oldAllergen = newAllergen;
    this.currentAllergen = newAllergen;
    this.formModel.patchValue({ name: this.currentAllergen.name });
  }
  get editAllergen(): Allergen {
    return this.oldAllergen;
  }

  @Output() editInList: EventEmitter<Allergen>=new EventEmitter();

  @Input() index: number | undefined;

  constructor(private allergenService: AllergenService) {
    this.allergenService.getAllergens().subscribe((data: Allergen[]) => {
      this.allergens = data; 
      console.table(this.allergens);
      if (this.index !== undefined) {
        let allergen = this.allergens[this.index];
        if (allergen) {
          this.editAllergen = allergen; 
        }
      }
    });
    
    this.formModel = new FormGroup({
      name: new FormControl('',[ Validators.maxLength(50)])
    });
    
  }

  submitForm() {
    console.log('submitting ',this.formModel.value.name);
    if(this.index!==undefined){
      let updatedAllergen: Allergen = {
        // id: this.currentAllergen.id,
        name: this.formModel.value.name
      };

      // this.allergenService.updateAllergen(updatedAllergen).subscribe(() => {
      //   console.log('Updated allergen:', updatedAllergen);
      //   this.editInList.emit(updatedAllergen);
      //   location.reload();
      // });
    }
  }

  cancel() {
    this.formModel.patchValue({ name: this.oldAllergen.name });
    this.editInList.emit();
  }
}
