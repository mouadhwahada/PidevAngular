import { Component } from '@angular/core';
import { Product } from '../Models/Product';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ProductServiceService } from '../product-service.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  totalOrderCount: number;
  totalPaymentAmount: number;
  totalProductsSoldInTransit: number;

  constructor(private router:Router,
    private productService: ProductServiceService, private orderService: OrderService) { }
    

  products:Product[];
  searchTerm: string;
  productsLowStock: Product[];
  productChart: any;
  productTypes: string[] = [];
  productCounts: number[] = [];


  

  ngOnInit(){
    this.productService.getProducts().subscribe(
      res=>this.products=res);
      this.productService.getProducts().subscribe(
        res=>this.products=res);

        this.getProductsLowStock();
        this.productService.getProducts().subscribe(res => this.products = res);
this.productService.getProducts().subscribe(res => this.products = res);
        this.getCountByType();
        this.fetchTotalOrderCount();
        this.fetchTotalPaymentAmount();
        this.fetchTotalProductsSoldInTransit();

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

loadProducts() {
  this.productService.getProducts().subscribe(
    res => this.products = res
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




fetchTotalOrderCount(): void {
  this.orderService.getTotalOrderCount().subscribe(
    count => {
      this.totalOrderCount = count;
    },
    error => {
      console.error('Erreur lors de la récupération du nombre total d\'ordres :', error);
      // Gérez l'erreur ici
    }
  );
}





fetchTotalPaymentAmount(): void {
  this.orderService.getTotalPaymentAmount().subscribe(
    amount => {
      this.totalPaymentAmount = amount;
    },
    error => {
      console.error('Error fetching total payment amount:', error);
      // Gérer l'erreur ici
    }
  );
}


fetchTotalProductsSoldInTransit(): void {
  this.orderService.getTotalProductsSoldInTransit().subscribe(
    total => {
      this.totalProductsSoldInTransit = total;
    },
    error => {
      console.error('Erreur lors de la récupération du nombre total de produits vendus en transit :', error);
      // Gérer l'erreur ici
    }
  );
}

}
