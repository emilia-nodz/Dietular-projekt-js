import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemService } from '../services/item.service';
import {  Item } from '../models/item.model'
import { ItemDetailsComponent } from '../item-details/item-details.component';
import { EditItemComponent } from '../edit-item/edit-item.component';


@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ItemDetailsComponent, EditItemComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  items: Item[] = [];

  constructor(private itemService: ItemService) {
    this.itemService.getItems().subscribe((data: Item[]) => {
    this.items = data;
    });
  }

  @Output() emitter: EventEmitter<number> = new EventEmitter();


  checker: number = 0;
  checkerfordelete: number = -1;
  updateChecker: number | null = null;

  showDetails(x: number) {
    if(this.checker!=x) {
       this.checker = x;
      this.emitter.emit(x);
    } else {
    this.checker = -1;
    }
  }

  deleteThing(itemid: number) {
    this.itemService.deleteItem(itemid).subscribe();
    location.reload();
  }

  showConfirmation(itemid: number) {
    this.checkerfordelete = itemid;
  }

  undo() {
    this.checkerfordelete = -1;
  }

  update(itemId: number): void {
    if(this.updateChecker = itemId) {
      this.updateChecker = itemId;
      this.emitter.emit(itemId);
      console.log("emited", itemId);
   } else {
    this.updateChecker = -1;
   }
  }
  
}

