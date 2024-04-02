import { Orderr } from "./Orderr";
import { User } from "./User";

export interface Delivery {
    deliveryId: number;
    deliveryDate: Date;
    deliveryAddress: string;
    deliveryPostalCode: string;
    deliveryCity: string;
    orderr: Orderr;
    user: User;
  }
  