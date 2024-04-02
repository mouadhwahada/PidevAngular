import { Component } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Models/Product';
import { OrderItemService } from '../order-item.service';
import { User } from '../Models/User';



@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css',
  "../../../node_modules/bootstrap/dist/css/bootstrap.min.css",]
})
export class DetailsProductComponent {
  
  productId: number; // variable pour stocker l'ID du produit
  product: Product; // variable pour stocker les détails du produit
  user:User

  constructor(private route: ActivatedRoute, private router:Router,private productService: ProductServiceService,    private orderItemService: OrderItemService
    ) { }


  


  ngOnInit(): void {
    // Récupérer l'ID du produit à partir de la route
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('idProduct'); // + convertit la chaîne en nombre
      // Utiliser l'ID du produit pour récupérer les détails du produit
      this.getProductDetails(this.productId);
      this.user.iduser = +localStorage.getItem('userId');

   
    }   
    );
  }

 
  addToCart(productId: number): void {
    const iduser = this.orderItemService.getUserIdFromLocalStorage();


    if (iduser) {
      // Appeler la méthode d'ajout d'order item avec l'ID de l'utilisateur
      this.orderItemService.addOrderItemmmmm(productId, iduser).subscribe(
        (orderItem) => {
          console.log('OrderItem créé avec succès:', orderItem);
          alert('Produit ajouté au panier avec succès!');
           
          
          // Redirection facultative après l'ajout de l'OrderItem
        },
        (error) => {
          console.error('Erreur lors de la création de l\'OrderItem:', error);
        }
      );
    } else {
      console.error('ID de l\'utilisateur introuvable dans le local storage.');
      // Gérer l'erreur si l'ID de l'utilisateur n'est pas trouvé dans le local storage
    }

  }




  getProductDetails(id: number): void {
    // Appeler la méthode getProductById du service ProductServiceService pour récupérer les détails du produit
    this.productService.getProductById(id).subscribe(data => {
      this.product = data; // Stocker les détails du produit dans la variable product
    });
  }
}