import { Component } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.css']
})
export class TryComponent {

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

}
