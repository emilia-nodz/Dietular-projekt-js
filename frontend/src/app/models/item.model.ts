import { Allergen } from "./allergen.model";

export interface Item {
    id: number,
    name: string,
    description: string,
    weight: number,
    calories: number,
    carbohydrates: number,
    proteins: number,
    fats: number,
    allergen_details: Allergen[]    
}

export interface ItemToAdd {
    id: number,
    allergens: number[],
    name: string,
    description: string,
    weight: number,
    calories: number,
    carbohydrates: number,
    proteins: number,
    fats: number       
}
