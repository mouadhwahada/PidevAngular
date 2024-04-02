import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { OrderService } from '../order.service';
import { OrderItemService } from '../order-item.service';
import { Orderr } from '../Models/Orderr';
import { ProductServiceService } from '../product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/User';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',

  styleUrls: ['./track.component.css',
]
})
export class TrackComponent {
isStepActive(arg0: string): any {
throw new Error('Method not implemented.');
}
  currentStep: string;
  progressValue: any;
  orderId: any;
  orderDetails: Orderr;
  calculateTotalCost() {
throw new Error('Method not implemented.');
}



user:User;




  orders: Orderr[] = [];



constructor(private orderItemService: OrderItemService,private orderService: OrderService,private productService: ProductServiceService  ,private route: ActivatedRoute,private router:Router,) { }
ngOnInit(): void {
  // Récupérer l'identifiant de la commande à partir des paramètres de requête
  this.route.queryParams.subscribe(params => {
    this.orderId = params['orderId'];
    if (this.orderId) {
      // Appeler le service de commande pour récupérer les détails de la commande
      this.orderService.retrieveOrder(this.orderId).subscribe(
        (response) => {
          this.orderDetails = response;
        },
        (error) => {
          console.error(error);
          // Gérer les erreurs de récupération des détails de la commande
        }
      );
    }
  });
}

}