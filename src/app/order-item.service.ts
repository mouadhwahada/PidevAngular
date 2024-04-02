import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from './Models/OrderItem';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private baseUrl:string ='http://localhost:8070/orderitem'

  constructor(private http: HttpClient) { }

  addOrderItem(productId: number): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.baseUrl}/add?productId=${productId}`, null);
  }

  retrieveOrderItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}/all`);
  }

  updateOrderItem(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.baseUrl}/update`, orderItem);
  }

  updateOrderItemById(id: number, orderItem: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.baseUrl}/update/${id}`, orderItem);
  }

  retrieveOrderItemById(id: number): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${this.baseUrl}/${id}`);
  }

  removeOrderItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }


  retrieveOrderItemsall(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}/all-with-products`);
}


  
  addOrderItemCart(productId: number): Observable<OrderItem> {
    // Effectuer une requête HTTP POST avec le productId comme paramètre
    return this.http.post<OrderItem>(`${this.baseUrl}/orderitempradd?productId=${productId}`, {});
  }

  
  addOrderItemmm(productId: number, iduser: number): Observable<OrderItem> {
    // Effectuer une requête HTTP POST avec les paramètres productId et iduser
    return this.http.post<OrderItem>(`${this.baseUrl}/orderItems?productId=${productId}&iduser=${iduser}`, {});
  }


  addOrderItemmmmm(productId: number, iduser: number): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.baseUrl}/orderItems?productId=${productId}&iduser=${iduser}`, {});
  }


  retrieveOrderItemsByUserId(iduser: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}/${iduser}`);
  }

  getUserIdFromLocalStorage(): number {
    // Récupérer l'ID de l'utilisateur depuis le local storage
    const iduser = localStorage.getItem('iduser');
    return iduser ? parseInt(iduser, 10) : null;
  }







  incrementQuantity(idOrderItem: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/items/${idOrderItem}/increment`, null);
  }

  decrementQuantity(idOrderItem: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/items/${idOrderItem}/decrement`, null);
  }

}