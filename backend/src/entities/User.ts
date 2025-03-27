import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cart } from "./cart";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({nullable:true})
  address? : string

  @Column({nullable:true})
  city? : string


  @OneToMany(()=>Cart,(cart)=>cart.user)
  cart: Cart[]

}
