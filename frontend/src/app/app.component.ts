import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./layout/header/header.component";
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive, CommonModule, HeaderComponent, RouterModule, MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend2';
}
