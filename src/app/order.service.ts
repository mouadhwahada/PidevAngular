import { Injectable } from '@angular/core';
import { Orderr } from './Models/Orderr';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './Models/Product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  
  private apiUrl = 'http://localhost:8070/order'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  addOrder(order: Orderr): Observable<Orderr> {
    return this.http.post<Orderr>(`${this.apiUrl}/addorder`, order);
  }

  retrieveOrders(): Observable<Orderr[]> {
    return this.http.get<Orderr[]>(`${this.apiUrl}/retrieveOrder`);
  }

  updateOrder(id: number, order: Orderr): Observable<Orderr> {
    return this.http.put<Orderr>(`${this.apiUrl}/updateOrder/${id}`, order);
  }

  retrieveOrder(id: number): Observable<Orderr> {
    return this.http.get<Orderr>(`${this.apiUrl}/retrieveOrder/${id}`);
  }

  removeOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeOrder/${id}`);
  }




  calculateOrderTotal(idOrder: number): Observable<number> {
    // Effectuer une requête HTTP GET pour calculer le total de la commande avec l'ID de commande spécifié
    return this.http.get<number>(`${this.apiUrl}/${idOrder}/total`);
  }


  


  checkout(iduser: number,paymentMethodId: string): Observable<any> {
    const headers = new HttpHeaders({
    });

    return this.http.post(`${this.apiUrl}/checkout/${iduser}`, { paymentMethodId }, { headers });
  }






  getUserIdFromLocalStorage(): number {
    // Récupérer l'ID de l'utilisateur depuis le local storage
    const iduser = localStorage.getItem('iduser');
    return iduser ? parseInt(iduser, 10) : null;
  }




  getTotalOrderCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-count`);
  }


  getTotalPaymentAmount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-amount`);
  }




  getTotalProductsSoldInTransit(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalProductsSoldInTransit`);
  }



  getProductsSoldInTransit(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/productsSoldInTransit`);
  }











  getOrderCountByStatus(status: string): Observable<number> {
    // Effectuer une requête HTTP GET pour récupérer le nombre d'ordres selon le statut
    return this.http.get<number>(`${this.apiUrl}/count/${status}`);
  }



}

