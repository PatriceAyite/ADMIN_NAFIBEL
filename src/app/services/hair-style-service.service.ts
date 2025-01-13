import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HairStyleModel } from '../Models/HairStyleModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class HairStyleService {
  private apiUrl = 'https://localhost:7143/api/HairStyle';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getAll(): Observable<HairStyleModel[]> {
    return this.http.get<HairStyleModel[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Méthode pour récupérer une coiffure par ID
  getById(id: string): Observable<HairStyleModel> {
    return this.http.get<HairStyleModel>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(hairStyle: Partial<HairStyleModel>): Observable<HairStyleModel> {
    return this.http.post<HairStyleModel>(this.apiUrl, hairStyle).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, hairStyle: HairStyleModel): Observable<HairStyleModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<HairStyleModel>(url, hairStyle).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
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
    this.snackBar.open(errorMessage, 'Fermer', {
      duration: 5000,
    });
    return throwError(() => new Error(errorMessage));
  }
}
