import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { Products } from "./products";



@Entity()
export class OrderItem{

    @PrimaryGeneratedColumn()
    id! : number;

    @ManyToOne(()=>Order, (order)=>order.orderItems,{onDelete:"CASCADE"})
    order!:Order;

    @ManyToOne(()=>Products, {onDelete:"CASCADE"})
    product!: Products

    @Column()
    quantity!:number

}