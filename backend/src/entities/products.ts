import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Restaurant } from "./restaurant";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("decimal",{precision:10,scale:2})
  price! : number;

  @ManyToOne(()=>Restaurant,(restaurant)=> restaurant.products,{onDelete:"CASCADE"})
  restaurant! : Restaurant

}
