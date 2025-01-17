import { Component, EventEmitter, Output } from '@angular/core';
import { Allergen } from '../models/allergen.model';
import { AllergenService } from '../services/allergen.service';
import { EditAllergenComponent } from "../edit-allergen/edit-allergen.component";

@Component({
  selector: 'app-allergen-list',
  standalone: true,
  imports: [EditAllergenComponent],
  templateUrl: './allergen-list.component.html',
  styleUrl: './allergen-list.component.css'
})
export class AllergenListComponent {
  allergens: Allergen[] = [];

  @Output() emitter: EventEmitter<number> = new EventEmitter();

  constructor(private allergenService: AllergenService) {
    this.allergenService.getAllergens().subscribe((data: Allergen[]) => {
      this.allergens = data; 
    });
  }

  checkerForDelete: number = 0;
  updateChecker: number | null = null;

  deleteThing(itemId: number) {
    console.log("Zaraz usuniemy " + itemId)
    this.allergenService.deleteAllergen(itemId).subscribe();
    location.reload();
  }
  
  showConfirmation(itemId: number) {
    this.checkerForDelete = itemId;
  }
  
  undo() {
    this.checkerForDelete = -1;
    console.log("Dobra jednak nie ")
  }

  update(allergenId: number): void {
    if(this.updateChecker = allergenId) {
      this.updateChecker = allergenId;
      this.emitter.emit(allergenId);
      console.log("emited", allergenId);
   } else {
    this.updateChecker = -1;
   }
    
  }
}
