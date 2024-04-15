import { Orderr } from "./Orderr";

export enum Objectif {
  OBJECTIF_1 = "Objectif 1",
  OBJECTIF_2 = "Objectif 2",
  // Ajoutez d'autres objectifs si nécessaire
}

export class User {
  iduser: number;
  userName: string;
  password: string;
  datenaissance: Date;
  weight: number;
  hight: number;
  objectif: Objectif;
  imc: number;
  orderrs: Orderr[];
  //id: Number;
}
