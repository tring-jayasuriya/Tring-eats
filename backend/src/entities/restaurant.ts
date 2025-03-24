import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Products } from "./products";

@Entity()
export class Restaurant{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name! : string;

    @Column({type:"boolean",default:true})
    isopen! : boolean;

    @Column({nullable:true})
    address? : string;

    @Column({nullable:true})
    city ?: string

    @Column({nullable:true})
    image?: string

    @OneToMany(()=>Products,(products)=>products.restaurant)
    products! : Products[]

}