import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './Models/Product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

private baseUrl:string ='http://localhost:8070/Product'

  constructor(private http:HttpClient) { }
  addNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/addProduct`, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/retrieveproduct`);
  }

  getProductById(idProduct: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/retrieveproduct/${idProduct}`);
  }

  updateProducts(idProduct: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/updateProducts/${idProduct}`, product);
  }
  
  removeProduct(idProduct: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/removeProduct/${idProduct}`);
  }
 
  searchProductByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search?name=${name}`);
  }


  getProductsLowStock(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/retrieveproductlowstock`);
  }



  countProductsByType(): Observable<Map<string, Object>[]> {
    return this.http.get<Map<string, Object>[]>(`${this.baseUrl}/countbytype`);
  }

  addProducttt(productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addProduct2`, productData);
  }

  addProductwith(formData: FormData): Observable<Product>{
    return this.http.post<Product>(this.baseUrl + '/addProductwith', formData);
  }

  getProductsByType(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/byType?type=${type}`);
  }

  getFilteredProducts(minPrice: number, maxPrice: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/productsByMarge?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }



  getUserIdFromLocalStorage(): number {
    // Récupérer l'ID de l'utilisateur depuis le local storage
    const iduser = localStorage.getItem('iduser');
    return iduser ? parseInt(iduser, 10) : null;
  }


  applyDiscount(productId: number, discountPercentage: number): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${productId}/discount?discountPercentage=${discountPercentage}`, null);
  }
}