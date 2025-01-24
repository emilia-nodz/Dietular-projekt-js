import { Item } from './item.model';
import { Meal } from './meal.model';
export interface Day {
    id: number,
    date: Date,
    item_details?: Item[], 
    meal_details?: Meal[]
}
export interface DayToAdd {
    id: number,
    date: Date,
    items?: number[],
    meals?: number[]
}