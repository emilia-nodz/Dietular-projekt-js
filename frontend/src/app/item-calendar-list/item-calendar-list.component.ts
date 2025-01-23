import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-calendar-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-calendar-list.component.html',
  styleUrl: './item-calendar-list.component.css'
})
export class ItemListComponent {
  items: Item[] = [];
  filteredItems: Item[] = [];
  @Input() assignedItems: Item[] = []; 
  @Output() interest = new EventEmitter<Item>();

  constructor(private itemService: ItemService) {
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.items = data;
      this.filterItems();
    });
  }

  ngOnChanges(): void {
    this.filterItems();
  }

  filterItems(): void {
    this.filteredItems = this.items.filter(
      item => !this.assignedItems.some(assigned => assigned.id === item.id)
    );
  }

  selectItem(item: Item): void {
    this.interest.emit(item);
  }
}
