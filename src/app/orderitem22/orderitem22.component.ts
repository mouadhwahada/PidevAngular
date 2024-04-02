import { Component } from '@angular/core';
import { OrderItemService } from '../order-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItem } from '../Models/OrderItem';
import { ProductServiceService } from '../product-service.service';
import { Observable, map, of } from 'rxjs';
import { Product } from '../Models/Product';
import { Orderr } from '../Models/Orderr';
import { User } from '../Models/User';
import { OrderService } from '../order.service';


@Component({
  selector: 'app-orderitem22',
  templateUrl: './orderitem22.component.html',
  styleUrls: ['./orderitem22.component.css',
  
]
})
export class Orderitem22Component {

  order:Orderr
 user:User;
 orderItems: OrderItem[] = [];
  costOrder: number;
  totalOrder: number;
  products: Product[];


 

  constructor(private orderItemService: OrderItemService,private orderService: OrderService,private productService: ProductServiceService  ,private route: ActivatedRoute,private router:Router,) { }
  

  ngOnInit(): void {
    const iduser = this.orderItemService.getUserIdFromLocalStorage();
    console.log('id est', iduser);
  
    // Récupérer tous les OrderItems
    this.orderItemService.retrieveOrderItems().subscribe(
      (allOrderItems: OrderItem[]) => {
        // Filtrer les OrderItems pour ne garder que ceux associés à l'iduser spécifié
        this.orderItems = allOrderItems.filter(orderItem => orderItem.user.id === iduser && !orderItem.paid);

        

        console.log('voila les orderItems', this.orderItems);
  
        // Calculer le total
      //  this.calculateTotal();

      const idOrder = allOrderItems[0].orderr.idOrder;
      console.log(idOrder)
      this.calculateOrderTotal().subscribe(total => {
        this.totalOrder = total;

        this.loadProducts();
      });
     
      },
      (error) => {
        console.error('Error fetching order items:', error);
      }
      
    );
    
  }
  
  // Dans order-items-show.component.ts


  loadProducts() {
    this.orderService.getProductsSoldInTransit().subscribe(
      res => this.products = res
    );
  }
  
  
  retrieveOrderItemsByUserId(iduser): void {
    // Appeler le service pour récupérer les OrderItems pour l'utilisateur spécifié

    
  }
  
  // Autres méthodes (calculateTotal(), getProductById(), decreaseQuantity(), removeOrderItem(), updateOrderItem()) restent inchangées
  
  
 
  proceedToCheckout() {
    this.router.navigateByUrl('/checkout');
  }

  getProductById(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (product) => {
        // Traitez le produit récupéré ici
        console.log(product);
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  reloadPage(): void {
    window.location.reload();}


  decreaseQuantity(orderItem: OrderItem): void {
    this.orderItemService.decrementQuantity(orderItem.idOrderItem).subscribe(
      () => {
        // Décrémente la quantité localement dans le composant
        if (orderItem.quantity > 1) {
          orderItem.quantity--;
                  this.calculateTotal(); // Met à jour le prix total
                 // this.totalOrder;
                 this.calculateOrderTotal();
                 this.reloadPage(); // Recharge la page pour afficher les changements


        }
      },
      (error) => {
        console.error('Error decreasing quantity:', error);
      }
    );
  }



  increaseQuantity(orderItem: OrderItem): void {
    this.orderItemService.incrementQuantity(orderItem.idOrderItem).subscribe(
      () => {
        // Incrémente la quantité localement dans le composant
        orderItem.quantity++;
        this.calculateTotal(); // Met à jour le prix total
           // this.totalOrder;
           this.calculateOrderTotal(); // Recalcule le total de la commande
           this.reloadPage(); // Recharge la page pour afficher les changements


      },
      (error) => {
        console.error('Error increasing quantity:', error);
      }
    );
  }


  // Dans order-items-show.component.ts
  
  
  calculateTotal(): number {
    // Implémentez la logique pour calculer le total des articles dans le panier
    return this.orderItems.reduce((total, orderItem) => total + (orderItem.product.price * orderItem.quantity), 0);
  }

  calculateOrderTotal(): Observable<number> {
    const firstOrderItemWithOrder = this.orderItems.find(item => item.orderr);
    
    if (firstOrderItemWithOrder) {
      const idOrder = firstOrderItemWithOrder.orderr.idOrder;
      // Utilisez le service d'ordre pour récupérer le total de la commande
      return this.orderService.calculateOrderTotal(idOrder);
    } else {
      // Retournez un Observable vide si aucun élément dans orderItems n'a orderr défini
      return of(0);
    }
  }
  
  

  


  removeOrderItem(orderItemId: number): void {
    this.orderItemService.removeOrderItem(orderItemId).subscribe(
      response => {
        // Gérer la réponse de la suppression, par exemple actualiser la liste des items de commande
        alert('Item de commande supprimé avec succès');
        this.reloadPage()
      },
      error => {
        // Gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
        alert('Erreur lors de la suppression de l\'item de commande:');
      }
    );
  }


  getImageUrl(product: Product): string {
    if (product && product.image) {
      return 'http://localhost/Uploads/ProductImages/' + product.image;
    } else {
      return ''; // Retourne une chaîne vide si product ou product.image est null
    }
  }


}

