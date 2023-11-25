import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Panel} from "./panel";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(private http : HttpClient) { }

public baseUrl = 'http://3.88.251.161:3000/panel'

  getPanier(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Gérer l'erreur d'authentification ici
          console.error('Authentication failed:', error.error.message);
          // Rediriger l'utilisateur vers la page de connexion ou afficher un message d'erreur approprié
        }
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
  savePanel(panel: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, panel);
  }
}
