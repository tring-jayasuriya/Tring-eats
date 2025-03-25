import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Restaurant } from "./restaurant";
import { Cart } from "./cart";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("decimal",{precision:10,scale:2})
  price! : number;

  @Column({nullable:true})
  image?: string;

  @Column({type:"boolean",default:true})
  isavailable! : boolean;

  @ManyToOne(()=>Restaurant,(restaurant)=> restaurant.products,{onDelete:"CASCADE"})
  @JoinColumn({ name: "restaurantid" })
  restaurant! : Restaurant

  @OneToMany(()=>Cart,(cart)=>cart.product)
  cart!:Cart[]

}
