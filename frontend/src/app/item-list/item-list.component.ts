import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemService } from '../services/item.service';
import {  Item } from '../models/item.model'
import { ItemDetailsComponent } from '../item-details/item-details.component';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { Allergen } from '../models/allergen.model';
import { AllergenService } from '../services/allergen.service';
@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ItemDetailsComponent, EditItemComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  items: Item[] = [];
  filteredItems: Item[] = [];
  allergens: Allergen[] = [];
  keywordslockedin: Allergen[] = [];
  constructor(private itemService: ItemService, private allergenService: AllergenService) {
    this.itemService.getItems().subscribe((data: Item[]) => {
    this.items = data;
    this.filteredItems = [...this.items];
    });
    
    this.allergenService.getAllergens().subscribe((data: Allergen[]) => {
      this.allergens = data;
    })
  }

  @Output() emitter: EventEmitter<Item[]> = new EventEmitter();
  @Output() emitterUpdate: EventEmitter<number> = new EventEmitter();

  checker: number = 0;
  checkerfordelete: number = -1;
  updateChecker: number | null = null;
  checkerForFilter: boolean = false;
  checkerForSort: boolean = false;

  showDetails(x: number, filteredItems: Item[]) {
    if(this.checker!=x) {
       this.checker = x;
      this.emitter.emit(filteredItems)
      this.emitterUpdate.emit(x)
    } else {
    this.checker = -1;
    }
  }

  getFilterChoice() {
    this.checkerForFilter = true;
  }

  turnOffFilterChoice() {
    this.keywordslockedin = [];
    this.checkerForFilter = false;
  }

  getSortChoice() {
    this.checkerForSort = true;
  }

  turnOffSortChoice() {
    this.checkerForSort= false;
  }

  deleteThing(itemid: number, index: number) {
    this.itemService.deleteItem(itemid).subscribe();
      if (index !== -1) {
        this.filteredItems.splice(index, 1);  
      }
      this.checkerfordelete = -1; 
    
    location.reload;
  }

  showConfirmation(itemid: number) {
    this.checkerfordelete = itemid;
  }

  undo() {
    this.checkerfordelete = -1;
  }

  sortAlphAsc() {
    this.filteredItems.sort((a, b) => {
      if (a.name < b.name) return -1;  
      if (a.name > b.name) return 1;
      return 0;
    });
    this.checkerForSort = false;
  }
  sortAlphDesc() {
    this.filteredItems.sort((a, b) => {
      if (a.name < b.name) return 1; 
      if (a.name > b.name) return -1;
      return 0;
    })
    this.checkerForSort = false;
  
  }

  sortProtein() {
    this.filteredItems.sort((a, b) => {
      if (a.proteins < b.proteins) return -1; 
      if (a.proteins > b.proteins) return 1;
      return 0;
    })
    this.checkerForSort = false;
  }

  sortCalories() {
    this.filteredItems.sort((a, b) => {
      if (a.calories < b.calories) return -1; 
      if (a.calories > b.calories) return 1;
      return 0;
    })
    this.checkerForSort = false;
  }

  sortFat() {
    this.filteredItems.sort((a, b) => {
      if (a.fats/a.weight*100 < b.fats/b.weight*100) return -1; 
      if (a.fats/a.weight*100 > b.fats/b.weight*100) return 1;
      return 0;
    })
    this.checkerForSort = false;
  }

  update(itemId: number, indeksplacement: number): void {
      this.updateChecker = itemId;
      this.emitterUpdate.emit(itemId);
      console.log("emited", itemId);
      this.emitterUpdate.emit(indeksplacement);
    
  }
  
  filter(): void {
    console.log("Filtruje");

    if (this.keywordslockedin.length === 0) {
      this.filteredItems = [...this.items]; 
      console.log("Nie ma po czym");
      this.keywordslockedin = [];
    this.checkerForFilter = false;
      return;
    }

    

    this.filteredItems = this.items.filter((item: Item) =>
      this.keywordslockedin.every((keyword) =>
        item.allergen_details.some((allergen) => allergen.id === keyword.id)
      )
    );

    this.keywordslockedin = [];
    this.checkerForFilter = false;

  }

  sort(): void {
    console.log("Sortuje");

  }

includeAllergen(keyword: Allergen): void {
  if(this.keywordslockedin.includes(keyword))
  {
    console.log("Usunięto" + keyword.name);
    let target: number = this.keywordslockedin.indexOf(keyword);
    if(target !== -1)
    {
         this.keywordslockedin.splice(target, 1);
         console.log("Destroyed")
    }
    else
    {
      console.log("Aint no " + keyword.name + "in this town");
    }
 
  }

  else
  {
     console.log("Dodano " + keyword);
  this.keywordslockedin.push(keyword);
  }
 
  
  for (let i: number = 0; i < this.keywordslockedin.length; i++) {
    console.log(this.keywordslockedin[i]);
  }

}

}



