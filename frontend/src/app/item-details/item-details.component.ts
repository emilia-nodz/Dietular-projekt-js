import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  Item } from '../models/item.model'
import { ItemService } from '../services/item.service';
import { ItemListComponent } from '../item-list/item-list.component';
@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent {
  items: Item[] = [];
  @Input() id: number | undefined;
  @Input() filtereditems: Item[] = []; 
  

  constructor( private itemService: ItemService) {
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.items = data;
    });
    
  }

  

}
