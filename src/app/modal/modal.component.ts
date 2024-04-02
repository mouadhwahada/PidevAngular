import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css',

]
})
export class ModalComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private productService: ProductServiceService,private _router:Router,) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required]],
      description: ['', Validators.required],
      stockQuantity: ['', [Validators.required]],
      type: ['', Validators.required],
      image: [null] // File input validation
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addProduct(): void {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();

      // Ajouter le fichier sélectionné
      formData.append('imageFile', this.selectedFile);

      // Récupérer les valeurs du formulaire
      const { name, price, description, stockQuantity, type } = this.productForm.value;

      // Ajouter les valeurs au FormData
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('stockQuantity', stockQuantity);
      formData.append('type', type);

      // Appeler le service pour ajouter le produit avec l'image
      this.productService.addProductwith(formData).subscribe(() => {
        alert("Product added successfully!");
        this.productForm.reset();
        this.selectedFile = null;
        this._router.navigate(['/shopback']);

      }, error => {
        alert("An error occurred while adding Product.");
        console.error(error);
      });
    } else {
      alert("Please fill in all the required fields correctly and select an image.");
    }
  }

  cancelEdit(): void {
    this.productForm.reset();
    this.selectedFile = null;
  }
}
