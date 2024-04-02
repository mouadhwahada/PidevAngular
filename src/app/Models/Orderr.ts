import { Delivery } from "./Delivery";
import { OrderItem } from "./OrderItem";
import { User } from "./User";


export class Orderr {
    idOrder!: number;
    dateOrder!: Date;
    status!: string;
    costOrder!: number;
    codeOrder: string;
     codeQR: string;

    orderItems!: OrderItem[];
    user: User;
    delivery: Delivery;
  }