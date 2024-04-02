export class User {
    constructor(
        public id:number,
        public userName:string,
        public password:string,
        public datenaissance: Date,
        public weight:number,
        public hight:number,
        public objectif:string,
        public imc:number
    ){

    }
}
