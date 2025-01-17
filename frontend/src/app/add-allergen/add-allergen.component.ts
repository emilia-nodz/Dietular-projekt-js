import { Component } from '@angular/core';
import { Allergen } from '../models/allergen.model';
import { AllergenService } from '../services/allergen.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-allergen',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-allergen.component.html',
  styleUrl: './add-allergen.component.css'
})
export class AddAllergenComponent {
  allergens: Allergen[] = [];

  formModel: FormGroup;

  constructor(private allergenService: AllergenService, private router: Router) {
    this.allergenService.getAllergens().subscribe((data: Allergen[]) => {
      this.allergens = data; 
    });

    this.formModel = new FormGroup({
      name: new FormControl('',[Validators.required])
    });
  }

  addAllergen(name: string): void {
    const newAllergen: Allergen = {name} as Allergen;
    console.log(newAllergen);
    this.router.navigate(['/allergen-list-component']);
    this.allergenService.addAllergen(newAllergen).subscribe((allergen) => {
      this.allergens.push(allergen);
    }) 
  }

  submitForm() {
    this.addAllergen(this.formModel.value.name);
  }
}
