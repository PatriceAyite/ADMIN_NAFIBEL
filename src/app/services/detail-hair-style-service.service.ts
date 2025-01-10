import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HairStyleModel } from '../Models/HairStyleModel';

@Injectable({
  providedIn: 'root',
})
export class DetailHairStyleServiceService {
  private apiUrl = 'https://localhost:7143/api/HairStyle';

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer une coiffure par ID
  getById(id: string): Observable<HairStyleModel> {
    return this.http.get<HairStyleModel>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) // Gérer les erreurs
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
