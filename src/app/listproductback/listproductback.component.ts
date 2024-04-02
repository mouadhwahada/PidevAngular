import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../Models/Product';
import Chart from 'chart.js/auto';



@Component({
  selector: 'app-listproductback',
  templateUrl: './listproductback.component.html',
  styleUrls: ['./listproductback.component.css',
  "../../../node_modules/bootstrap/dist/css/bootstrap.min.css",
  ]
 
})
export class ListproductbackComponent {
  productChart: any;
  productTypes: string[] = [];
  productCounts: number[] = [];

  
    
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








}
