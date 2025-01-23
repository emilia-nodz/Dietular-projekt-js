import { Item } from './item.model';
import { Meal } from './meal.model';
export interface Day {
    id: number,
    date: Date,
    items: number[];
    item_details?: Item[], 
    meals: number[],
    meal_details?: Meal[];
}
