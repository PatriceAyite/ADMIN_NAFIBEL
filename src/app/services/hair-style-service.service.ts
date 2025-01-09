import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HairStyleModel } from '../Models/HairStyleModel';

@Injectable({
  providedIn: 'root',
})
export class HairStyleService {
  private apiUrl = 'https://localhost:7143/api/HairStyle';

  constructor(private http: HttpClient) {}

  getAll(): Observable<HairStyleModel[]> {
    return this.http.get<HairStyleModel[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  create(hairStyle: HairStyleModel): Observable<HairStyleModel> {
    return this.http.post<HairStyleModel>(this.apiUrl, hairStyle).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur inconnue est survenue !';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      errorMessage = `Code de l'erreur : ${error.status}\nMessage : ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
