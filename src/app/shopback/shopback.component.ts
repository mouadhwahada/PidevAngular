import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Product } from '../Models/Product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-shopback',
  templateUrl: './shopback.component.html',
  styleUrls: ['./shopback.component.css']
})
export class ShopbackComponent implements OnInit {
  discountPercentage: any;
  productId: number;
  showModal: boolean = false;
  productChart: any;
  productTypes: string[] = [];
  productCounts: number[] = [];
  discountMode: boolean = false;
  products: Product[] = [];
  searchTerm: string;
  productsLowStock: Product[];
  selectedProduct: Product | null = null;
  pagedProducts: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 8;
  pages: number[] = [];

  constructor(private router: Router, private productService: ProductServiceService) { }

  ngOnInit() {
    this.loadProducts();
    this.getCountByType();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (res: Product[]) => {
        this.products = res;
        this.setPage(1);
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.products.length);
    this.pagedProducts = this.products.slice(startIndex, endIndex);
    this.generatePagination();
  }

  generatePagination() {
    const pageCount = Math.ceil(this.products.length / this.pageSize);
    this.pages = [];
    for (let i = 1; i <= pageCount; i++) {
      this.pages.push(i);
    }
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.loadProducts();
      return;
    }

    this.productService.searchProductByName(this.searchTerm).subscribe(
      (products: Product[]) => {
        this.products = products;
        this.setPage(1);
      },
      (error) => {
        console.error('Error searching products:', error);
      }
    );
  }

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
    this.selectedProduct = product;
  }

  removeProduct(idProduct: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.removeProduct(idProduct).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  openModal(selectedProduct: Product): void {
    this.selectedProduct = selectedProduct;
    this.productId = selectedProduct.idProduct;
    this.discountMode = false;
    this.showModal = true;
  }

  closeModal(): void {
    this.selectedProduct = null;
    this.discountMode = false;
    this.showModal = false;
  }

  showDiscountInput(product): void {
    this.discountMode = true;
    this.showModal = true;
    this.selectedProduct = product;
  }

  getImageUrl(product: Product): string {
    if (product && product.image) {
      return 'http://localhost/Uploads/ProductImages/' + product.image;
    } else {
      return '';
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
              this.setPage(this.currentPage); // Update the page after applying discount
            }
            this.closeModal();
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
