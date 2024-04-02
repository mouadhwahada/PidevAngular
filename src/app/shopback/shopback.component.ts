import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Product } from '../Models/Product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-shopback',
  templateUrl: './shopback.component.html',
  styleUrls: ['./shopback.component.css',
]
})
export class ShopbackComponent {
discountPercentage: any;
showStats() {
throw new Error('Method not implemented.');
}
  productId: number;
  showModal: boolean = false; // Variable pour contrôler l'affichage du modal



editProduct(arg0: number) {
throw new Error('Method not implemented.');
}

  productChart: any;
  productTypes: string[] = [];
  productCounts: number[] = [];

  discountMode: boolean = false; // Variable de contrôle pour afficher le champ de saisie du rabais


  
    
      constructor(private router:Router,
        private productService: ProductServiceService) { }
        
    
      products:Product[];
      searchTerm: string;
      productsLowStock: Product[];

    
      
    
      ngOnInit(){
        this.productService.getProducts().subscribe(
          res=>this.products=res);
          this.productService.getProducts().subscribe(
            res=>this.products=res);

            this.getProductsLowStock();
            this.productService.getProducts().subscribe(res => this.products = res);
    this.productService.getProducts().subscribe(res => this.products = res);
            this.getCountByType();
      }

        // Liste des produits
  //products: Product[];

  // Produit sélectionné pour afficher les détails
  selectedProduct: Product | null = null;

  // Méthode pour afficher les détails du produit dans la modale
 
  getCountByType(): void {
    this.productService.countProductsByType().subscribe(
      response => {
        console.log('Count by type:', response);
        this.productTypes = response.map((item: any) => item.type);
        this.productCounts = response.map((item: any) => item.count);
        
        this.drawChart();
      },
      error => {
        console.error('Error counting products by type:', error);
        // Gérez les erreurs ici
      }
    );
  }

  drawChart() {
    var ctx = document.getElementById('productChart') as HTMLCanvasElement;
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.productTypes,
        datasets: [{
          label: 'Nombre de produits par type',
          data: this.productCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    
    });
  }

    


  showDetails(product: Product) {
    this.selectedProduct = product;}
  

    removeProduct(idProduct: number) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        this.productService.removeProduct(idProduct).subscribe(() => {
          // Actualiser la liste des produits après la suppression
          this.loadProducts();
        });

}

}
loadProducts() {
  this.productService.getProducts().subscribe(
    res => this.products = res
  );
}
onSearch(): void {
  if (!this.searchTerm) {
    // Si le terme de recherche est vide, récupérez tous les produits
    return this.loadProducts();
  }

  // Recherche des produits par nom
  this.productService.searchProductByName(this.searchTerm).subscribe(
    (products: Product[]) => {
      this.products = products;
      console.log('Products found:', products);
    },
    (error) => {
      console.error('Error searching products:', error);
    }
  );
}


getProductsLowStock(): void {
  this.productService.getProductsLowStock().subscribe(
    (products: Product[]) => {
      this.productsLowStock = products;
      console.log(products)
    },
    (error) => {
      console.error('Error fetching products with low stock:', error);
    }
  );


}

openModal(selectedProduct: Product): void {
  this.selectedProduct = selectedProduct;
  this.productId = selectedProduct.idProduct;
  this.discountMode = false; // Initialiser le mode de rabais à false
  this.showModal = true; // Afficher le modal
}

closeModal(): void {
  this.selectedProduct = null;
  this.discountMode = false; // Activer le mode de rabais
  this.showModal = false; // Cacher le modal
}



showDiscountInput(product): void {
  this.discountMode = true; // Activer le mode de rabais
  this.showModal = true; 
  this.selectedProduct = product;

 // this.productId = selectedProduct.idProduct;
  // Afficher le modal
}


getImageUrl(product: Product): string {
  if (product && product.image) {
    return 'http://localhost/Uploads/ProductImages/' + product.image;
  } else {
    return ''; // Retourne une chaîne vide si product ou product.image est null
  }
}




applyDiscount(selectedProduct): void {
  if (!isNaN(this.discountPercentage)) {
    if (this.discountPercentage >= 0) {
      this.productService.applyDiscount(selectedProduct.idProduct, this.discountPercentage).subscribe(
        (updatedProduct: Product) => {
          const index = this.products.findIndex(product => product.idProduct === updatedProduct.idProduct);
          if (index !== -1) {
            this.products[index] = updatedProduct;
            console.log(selectedProduct.idProduct) // Mettre à jour le produit dans la liste
          }
          this.closeModal(); // Fermer le modal après l'application de la réduction
        },
        (error) => {
          console.error('Error applying discount:', error);
        }
      );
    } else {
      console.error('Invalid discount percentage');
    }
  } else {
    console.error('Invalid input');
  }
}
}