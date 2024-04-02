import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../Models/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent {
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.readFileContent(file);
    }
  }
  imageData: Uint8Array; // Variable pour stocker les données de l'image


  // Lire le contenu du fichier image
  readFileContent(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      this.imageData = new Uint8Array(arrayBuffer); // Stocker les données de l'image
    };
    reader.readAsArrayBuffer(file);
  }

  constructor(private _router:Router,
    private productService: ProductServiceService, private fb: FormBuilder,    private route: ActivatedRoute,

    ) { }
    productId: number;
    product: Product; // Assurez-vous d'importer le modèle Product
    productForm: FormGroup;


    ngOnInit(): void {
      this.productId = +this.route.snapshot.paramMap.get('id');
      
      // Initialisez le formulaire et chargez les détails du produit à mettre à jour
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        description: ['', Validators.required],
        stockQuantity: ['', Validators.required],
        type: ['', Validators.required],
      //  image: [] // File input for image
      });
  
      // Récupérez les détails du produit à partir de l'identifiant et pré-remplissez le formulaire
      this.productService.getProductById(this.productId).subscribe(
        (product: Product) => {
          this.product = product;
          this.productForm.patchValue({
            name: product.name,
            price: product.price,
            description: product.description,
            stockQuantity: product.stockQuantity,
            type: product.type
            // Laissez le champ image vide pour ne pas pré-remplir l'image
          });
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  
    onSubmit(): void {
      if (this.productForm.invalid) {
        return;
      }
  
      const formData: Product = this.productForm.value;
      // Ajouter l'identifiant du produit à mettre à jour
      formData.idProduct = this.productId;
  
      this.productService.updateProducts(this.productId, formData).subscribe(
        response => {
          // Traitez la réponse du backend
          console.log('Product updated successfully:', response);
          alert("successfully updated");
          this._router.navigate(['/shopback']);
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
    }
  }
