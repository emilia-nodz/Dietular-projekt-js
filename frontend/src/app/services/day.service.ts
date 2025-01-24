import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Day, DayToAdd} from '../models/day.model';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  private apiUrl = 'http://localhost:8000/app/day/';
  router: any;

  constructor(private http: HttpClient) {}

  getDays(): Observable<Day[]> {
    return this.http.get<Day[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting day:', error);
        return throwError(() => new Error('Error getting day'));
      })
    );
  }

  getDaysToAdd(): Observable<DayToAdd[]> {
    return this.http.get<DayToAdd[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting day:', error);
        return throwError(() => new Error('Error getting day'));
      })
    );
  }

  addDay(DayToAdd: DayToAdd): Observable<Day> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.router.navigate(['/calendar-component']);
    return this.http.post<Day>(this.apiUrl, DayToAdd, httpOptions).pipe(
      catchError(error => {
        console.error('Error adding day:', error);
        return throwError(() => new Error('Error adding day'));
      })
    );
  }

  getDayByDate(date: Date): Observable<Day> {
    const formattedDate = this.formatDate(date);
    return this.http.get<Day>(`${this.apiUrl}/date/${formattedDate}`);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  }

  updateDay(DayToAdd: DayToAdd): Observable<Day> {
    return this.http.patch<Day>(`${this.apiUrl}${DayToAdd.id}/`, DayToAdd).pipe(
      catchError(error => {
        console.error('Error deleting day:', error);
        return throwError(() => new Error('Error deleting day'));
      })
    );
  }

}
