import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./User";
import { Products } from "./products";

@Entity()
@Unique(["user","product"])
export class Cart{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>User,(user)=>user.cart,{onDelete:"CASCADE"})
    user:User

    @ManyToOne(()=>Products,(product)=>product.cart,{onDelete:"CASCADE"})
    product!:Products

}