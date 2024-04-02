import { Component,AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../Models/Product';
import { ProductServiceService } from '../product-service.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderItemService } from '../order-item.service';
import { User } from '../Models/User';


declare var $: any; // Déclaration de jQuery

@Component({
  selector: 'app-productssss',
  templateUrl: './productssss.component.html',
  styleUrls: ['./productssss.component.css',
  "../../../node_modules/bootstrap/dist/css/bootstrap.min.css",
]
})
export class ProductssssComponent {


  pagedProducts: Product[] = [];
  totalItems: number;
  pageSize = 6; // Nombre d'éléments par page
  currentPage = 1; // Page actuelle
  isDescriptionVisible: boolean;
  totalProductCount: number = 0;
  filteredProductCount: number =0;
  filteredProducts: Product[];
count0to30: number = 0;
  count31to60: number = 0;
  count61to90: number = 0;
  count121to300: number = 0;
  count301to1000: number = 0;
  count91to120: number = 0;


  constructor(private _router: Router,
    private productService: ProductServiceService, private modalService: NgbModal, config: NgbPaginationConfig,private orderItemService: OrderItemService) {
    config.size = 'sm';
    config.boundaryLinks = true;
  }

  filteredProductCounts = [0, 0, 0, 0, 0, 0];

  products: Product[];
  selectedProduct: any | null = null;
  i: any;
  totalPages: number;
  pages: number[];
  isFlipped: boolean = false;
  stockQuantities: { [key: string]: number } = {}; // Stocke les quantités de stock par type de produit

  productId: number; // variable pour stocker l'ID du produit
  product: Product; // variable pour stocker les détails du produit
  user:User

 
    toggleDescription(): void {
      this.isDescriptionVisible = !this.isDescriptionVisible;
    }


    

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res;
        this.totalItems = this.products.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePagedProducts();
        this.calculateStockQuantities();
       // this.getProductDetails(this.productId);
      this.user.iduser = +localStorage.getItem('userId'); // Calculer les quantités de stock initiales


// Remise à zéro des compteurs avant de les recalculer
this.count0to30 = 0;
this.count31to60 = 0;
this.count61to90 = 0;
this.count91to120 = 0;
this.count121to300 = 0;
this.count301to1000 = 0;



      },
      (error) => {
        console.error('Error retrieving products:', error);
        
      }
    );
  }
  updatePagedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, startIndex + this.pageSize);
  }

  closeModal() {
    this.selectedProduct = null;
  }

  openModal(selectedProduct: Product) {
    this.selectedProduct = selectedProduct;
    this.productId = selectedProduct.idProduct; // Stocker l'ID du produit sélectionné

    console.log(selectedProduct);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages; // Définir la page actuelle sur la dernière page disponible
      }

      this.updatePagedProducts();    }
  }
  getImageUrl(product: Product): string {
    if (product && product.image) {
      return 'http://localhost/Uploads/ProductImages/' + product.image;
    } else {
      return ''; // Retourne une chaîne vide si product ou product.image est null
    }
  }





toggleInfo(product: Product) {
    if (this.selectedProduct === product) {
      this.selectedProduct = null; // Hide card back if clicked again
    } else {
      this.selectedProduct = product; // Show card back for selected product
    }
  }



  loadproducts(){   window.location.reload();

  }




  onCategoryClick(type: string) {
    this.productService.getProductsByType(type).subscribe(
      (res) => {
        this.products = res;
        this.totalItems = this.products.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages; // Définir la page actuelle sur la dernière page disponible
        }
  
        this.updatePagedProducts();      },
      (error) => {
        console.error('Error retrieving products by type:', error);
      }
    );
  }


  onCategoryClickk(type: string) {
    this.productService.getProductsByType(type).subscribe(
      (res) => {
        this.products = res;
        this.calculateStockQuantities(); // Recalculer les quantités de stock pour le nouveau type de produit
        // Autres mises à jour...

      },
      (error) => {
        console.error('Error retrieving products by type:', error);
      }
    );
  }


  calculateStockQuantities() {
    // Réinitialiser les quantités de stock
    this.stockQuantities = {};
    // Calculer les quantités de stock pour chaque type de produit
    for (const product of this.products) {
      if (this.stockQuantities.hasOwnProperty(product.type)) {
        this.stockQuantities[product.type] += product.stockQuantity;
      } else {
        this.stockQuantities[product.type] = product.stockQuantity;
      }
    }
  }


 


  filterProductsByPriceRange(minPrice: number, maxPrice: number | null) {
    this.productService.getFilteredProducts(minPrice, maxPrice).subscribe(
      (filteredProductss) => {
        this.products = filteredProductss;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages; // Définir la page actuelle sur la dernière page disponible
        }
  
        this.updatePagedProducts();
       // Variables pour stocker les compteurs de produits filtrés pour chaque plage de prix


      // Parcourir les produits pour chaque plage de prix et incrémenter le compteur approprié
     
      // Mettre à jour les badges avec les compteurs appropriés
      // Vous pouvez les stocker dans un tableau ou les manipuler directement ici
      // Pour cet exemple, nous allons les stocker dans un tableau
      // Maintenant, vous pouvez attribuer ces valeurs aux badges dans votre template HTML
  
       // location.reload(); // Recharger la page

      },
      (error) => {
        console.error('Error filtering products:', error);
      }
    );
  }




  addToCart(productId: number): void {
    const iduser = this.orderItemService.getUserIdFromLocalStorage();

    if (iduser) {
        this.orderItemService.addOrderItemmmmm(productId, iduser).subscribe(
            (orderItem) => {
                console.log('OrderItem créé avec succès:', orderItem);
                alert('Produit ajouté au panier avec succès!');
                // Redirection facultative après l'ajout de l'OrderItem
            },
            (error) => {
                console.error('Erreur lors de la création de l\'OrderItem:', error);
                if (error.error && error.error.message) {
                    alert(error.error.message);
                } else {
                    alert('Vous avez déja ajouté ce produit à votre panier .');
                }
            }
        );
    } else {
        console.error('ID de l\'utilisateur introuvable dans le local storage.');
        // Gérer l'erreur si l'ID de l'utilisateur n'est pas trouvé dans le local storage
    }

  }














}
