import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ItemListComponent } from '../../item-list/item-list.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive, CommonModule, ItemListComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  onTestClick() {
    console.log('Items link clicked!');
  }
}
