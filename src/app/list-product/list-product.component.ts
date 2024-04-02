import { Component } from '@angular/core';
import { Product } from '../Models/Product';
import { ProductServiceService } from '../product-service.service';
import { Router } from '@angular/router';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap'; // Assurez-vous d'importer NgbPaginationConfig
import '@angular/localize/init';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css',
    "../../../node_modules/bootstrap/dist/css/bootstrap.min.css",
  ],
  providers: [NgbPaginationConfig] // Fournir NgbPaginationConfig en tant que fournisseur
})
export class ListProductComponent {
  pagedProducts: Product[] = [];
  totalItems: number;
  pageSize = 6; // Nombre d'éléments par page
  currentPage = 1; // Page actuelle

  constructor(private _router: Router,
    private productService: ProductServiceService, private modalService: NgbModal, config: NgbPaginationConfig) {
    config.size = 'sm';
    config.boundaryLinks = true;
  }

  products: Product[];
  selectedProduct: any | null = null;
  i: any;
  totalPages: number;
  pages: number[];

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res;
        this.totalItems = this.products.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePagedProducts();
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
    console.log(selectedProduct);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedProducts();
    }
  }
  getImageUrl(product: Product): string {
    if (product && product.image) {
      return 'http://localhost/Uploads/ProductImages/' + product.image;
    } else {
      return ''; // Retourne une chaîne vide si product ou product.image est null
    }
  }
  
  
  
  

}
