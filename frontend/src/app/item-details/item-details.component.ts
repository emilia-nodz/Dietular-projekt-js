import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  Item } from '../models/item.model'
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent {
  items: Item[] = [];

  @Input() index: number | undefined;

  constructor( private itemService: ItemService) {
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.items = data;
    });
  }



}
