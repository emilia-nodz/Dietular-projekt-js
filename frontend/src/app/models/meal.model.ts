import { Item } from "./item.model"
export interface Meal {
    id: number,
    name: string,
    description: string,
    item_details: Item[],
    numberOfPortions: number,
    portionWeight: number,
    caloriesPerPortion: number,
}

export interface MealToAdd {
    id: number,
    items: number[],
    name: string,
    description: string,
    numberOfPortions: number,
    portionWeight: number,
    caloriesPerPortion: number,
}