import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ItemListComponent } from './item-list/item-list.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AllergenListComponent } from './allergen-list/allergen-list.component';
import { AddAllergenComponent } from './add-allergen/add-allergen.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddMealComponent } from './add-meal/add-meal.component';


export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'item-list-component', component: ItemListComponent },
    { path: 'meal-list-component', component: MealListComponent },
    { path: 'add-meal-component', component: AddMealComponent},
    { path: 'add-item-component', component: AddItemComponent },
    { path: 'allergen-list-component', component: AllergenListComponent },
    { path: 'add-allergen-component', component: AddAllergenComponent},
    { path: 'calendar-component', component: CalendarComponent},
];
