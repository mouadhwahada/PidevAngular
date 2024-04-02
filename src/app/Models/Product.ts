import { OrderItem } from "./OrderItem";
import { TypeProduit } from "./TypeProduit";

export class Product {
    idProduct!: number;
    name!: string;
    image: string;
    price!: number;
    description!: string;
    stockQuantity!: number;
    type!: TypeProduit;
    isFavourite: boolean = false;
    orderItems!:OrderItem[]
imageUrl: any;
dateAdded: Date; 





getImageUrl(baseUrl: string, imageName: string): string {
  // Assurez-vous que baseUrl se termine par un /
  if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
  }
  // Retourne l'URL complète de l'image en concaténant la base URL avec le nom du fichier de l'image
  return `${baseUrl}${imageName}`;
}

  }