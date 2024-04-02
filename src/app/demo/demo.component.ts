import { Component } from '@angular/core';
import { Product } from '../Models/Product';
import { Router } from '@angular/router';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {

  
  constructor(private _router: Router,
    private productService: ProductServiceService, private modalService: NgbModal, config: NgbPaginationConfig) {
  }

  products: Product[];
  selectedProduct: any | null = null;
  i: any;

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (error) => {
        console.error('Error retrieving products:', error);
        
      }
    );
}
}