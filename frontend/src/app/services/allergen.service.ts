import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Allergen} from '../models/allergen.model';

@Injectable({
  providedIn: 'root'
})
export class AllergenService {

  private apiUrl = 'http://localhost:8000/app/allergen/';

  constructor(private http: HttpClient) {}

  getAllergens(): Observable<Allergen[]> {
    return this.http.get<Allergen[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting allergens:', error);
        return throwError(() => new Error('Error getting allergens'));
      })
    );
  }

  addAllergen(Allergen: Allergen): Observable<Allergen> {
    return this.http.post<Allergen>(this.apiUrl, Allergen).pipe(
      catchError(error => {
        console.error('Error adding allergen:', error);
        return throwError(() => new Error('Error adding allergen'));
      })
    );
  }

  deleteAllergen(Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${Id}/`).pipe(
      catchError(error => {
        console.error('Error deleting allergen:', error);
        return throwError(() => new Error('Error deleting allergen'));
      })
    );
  }

  updateAllergen(Allergen: Allergen): Observable<Allergen> {
    return this.http.patch<Allergen>(`${this.apiUrl}${Allergen.id}/`, Allergen).pipe(
      catchError(error => {
        console.error('Error deleting allergen:', error);
        return throwError(() => new Error('Error deleting allergen'));
      })
    );
  }


}

