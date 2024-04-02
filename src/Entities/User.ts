export class User {

    id!: number;
    userName!: String ;
    password!: String ;
    datenaissance!: Date ;
    userName!: String ;
    
    private Date datenaissance;
    private Float weight;
    private Float hight;
    @Enumerated(EnumType.STRING)
    private Objectif objectif;
    private Float imc;




}