import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Meal,MealToAdd } from '../models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  
  private apiUrl = 'http://localhost:8000/app/meal/';

  constructor(private http: HttpClient) {}

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting meals:', error);
        return throwError(() => new Error('Error getting meals'));
      })
    );
  }

  getMealsToAdd(): Observable<MealToAdd[]> {
    return this.http.get<MealToAdd[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting meals:', error);
        return throwError(() => new Error('Error getting meals'));
      })
    );
  }

  addMeal(MealToAdd: MealToAdd): Observable<Meal> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Meal>(this.apiUrl, MealToAdd, httpOptions).pipe(
      catchError(error => {
        console.error('Error adding meal:', error);
        return throwError(() => new Error('Error adding meal'));
      })
    );
  }

  deleteMeal(Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${Id}/`).pipe(
      catchError(error => {
        console.error('Error deleting meal:', error);
        return throwError(() => new Error('Error deleting meal'));
      })
    );
  }
  
  updateMeal(MealToAdd: MealToAdd): Observable<Meal> {
    return this.http.patch<Meal>(`${this.apiUrl}${MealToAdd.id}/`, MealToAdd).pipe(
      catchError(error => {
        console.error('Error deleting item:', error);
        return throwError(() => new Error('Error deleting item'));
      })
    );
  }
  
}
