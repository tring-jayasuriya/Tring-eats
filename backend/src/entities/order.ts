import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { OrderItem } from "./orderItem";


export enum OrderStatus{
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled"
}

export enum PaymentStatus{
    PAID = "paid",
    UNPAID  = "unpaid"
}

@Entity()
export class Order{

    @PrimaryGeneratedColumn()
    id! : number;

    @ManyToOne(()=>User, (user)=>user.orders,{onDelete:"CASCADE"})
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(()=>OrderItem,(orderItem)=>orderItem.order,{cascade:true})
    orderItems!: OrderItem[];

    @Column({type:"enum", enum : PaymentStatus, default:PaymentStatus.UNPAID})
    paymentStatus!: PaymentStatus;

    @Column({type:"enum",  enum:OrderStatus, default:OrderStatus.PENDING})
    orderStatus!: OrderStatus;

}