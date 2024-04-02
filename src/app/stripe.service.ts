import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http:HttpClient) { }

  getStripeSecretKey(): Observable<string> {
    // Utilisez 'text' comme type de réponse pour obtenir une chaîne de caractères
    return this.http.get('http://localhost:8070/api/stripe-secret-key', { responseType: 'text' });
  }
}