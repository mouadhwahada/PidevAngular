import { Component, OnInit } from '@angular/core';
import { Orderr } from '../Models/Orderr';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orderback',
  templateUrl: './orderback.component.html',
  styleUrls: ['./orderback.component.css']
})
export class OrderbackComponent implements OnInit {

  showOrderDetails(orderId: number) {
    const order = this.orders.find(order => order.idOrder === orderId);
      
}

  orders: Orderr[] = []; // Tableau pour stocker les données des commandes

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.retrieveOrderItems(); // Appel de la méthode pour récupérer les commandes lors de l'initialisation du composant
  }

  retrieveOrderItems(): void {
    this.orderService.retrieveOrders().subscribe(
      (orders: Orderr[]) => {
        this.orders = orders;
        console.log('Orders:', this.orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
