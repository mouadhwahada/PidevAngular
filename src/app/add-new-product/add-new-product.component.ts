import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css',
  "../../../node_modules/@fortawesome/fontawesome-free/css/all.css",
  
]
})
export class AddNewProductComponent {

  constructor(private fb: FormBuilder, private _router: Router, private productService: ProductServiceService) { }

  productForm: FormGroup;
  imageData: Uint8Array; // Variable pour stocker les données de l'image

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      type: ['', Validators.required],
      image: [null] // File input for image
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const formData: Product = this.productForm.value;
    // Ajouter les données de l'image à l'objet formData
  //  formData.image = this.imageData;

    this.productService.addNewProduct(formData).subscribe(
      response => {
        // Traitez la réponse du backend
        console.log('Product added successfully:', response);
        alert('Product added successfully!'); // Afficher l'alerte de succès
        // Vider le formulaire après l'ajout réussi
        this.productForm.reset();
      },
      error => {
        // Gérez les erreurs
        console.error('Error adding product:', error);
        alert('Error adding product. Please try again.'); // Afficher l'alerte d'erreur
      }
    );
  }

  // Gérer la sélection de fichier pour l'image
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.readFileContent(file);
    }
  }

  // Lire le contenu du fichier image
  readFileContent(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      this.imageData = new Uint8Array(arrayBuffer); // Stocker les données de l'image
    };
    reader.readAsArrayBuffer(file);
  }
}
