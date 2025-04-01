import bcrypt from "bcrypt";
import { AppDataSource } from "../../db/data-source";
import { User } from "../../entities/User";
import { generateToken } from "../../utils/generateJwtToken";
import { Restaurant } from "../../entities/restaurant";
import { Cart } from "../../entities/cart";
import { OrderItem } from "../../entities/orderItem";
import { Order } from "../../entities/order";
import { Products } from "../../entities/products";


export async function login(email: string, password: string,type:string): Promise<string> {

    const EntityName= type==="user"?User:Restaurant

    const userRepository = AppDataSource.getRepository(EntityName)

    const user = await userRepository.findOne({ where: { email } })

    if (!user) throw new Error("Email not found")

    const comparePassword = await bcrypt.compare(password, user.password)

    console.log(">>>>> passwod hash");

    if (!comparePassword) throw new Error("Invalid credentails")

    const token = generateToken({ id: user?.id, type : type })

    console.log("token generates");

    return token
}


export  async function register(email:string,password:string,name:string): Promise<string>{

    const userRepository = AppDataSource.getRepository(User)

    const user=await userRepository.findOne(({where:{email}}))

    if(user) throw new Error("user already registered ***")

    const hashedPassword= await bcrypt.hash(password,5)

    const newUser=userRepository.create({name:name,password:hashedPassword,email:email})

    const savedUser = await userRepository.save(newUser)

    console.log("saved user",savedUser);

    return "user registered successfully"

}


export async function getUserInfo(id:number):Promise<{id:number,name:string,address:string | null,email:string,city:string | null}>{

    const userRepository = AppDataSource.getRepository(User)
    const userData = await userRepository.findOne({where:{id}})
    if(!userData) throw new Error("user not found")
    console.log(userData);
    return {name:userData?.name,id:id, email:userData?.email, address:userData?.address || null, city:userData?.city || null}

}


export async function getRestaurantData(id:number): Promise<{id:number,name:string,isopen:boolean}>{
    const userRepository=await AppDataSource.getRepository(Restaurant)
    const restaurantData=await userRepository.findOne({where:{id}})
    if(!restaurantData) throw new Error("user not found")
    return {name:restaurantData?.name, id:23,isopen:restaurantData.isopen}

}

export async function InsertOrderItems(args:any): Promise<string> {

    const { orderItems}=args
    const orderItemRepo=await AppDataSource.getRepository(OrderItem)
    const orderRepo=await AppDataSource.getRepository(Order)
    const productRepo=await AppDataSource.getRepository(Products)
    const userRepo=await AppDataSource.getRepository(User)
    const cartRepo=await AppDataSource.getRepository(Cart)
    let userId: number | null = null;


    for(const item of orderItems){

        const order = await orderRepo.findOne({ where: { id: item.orderId },relations:["user"] });
        const product = await productRepo.findOne({ where: { id: item.productId } });

        if (!order) {
            console.error(`Order with ID ${item.orderId} not found.`);
            continue; 
        }

        if (!product) {
            console.error(`Product with ID ${item.productId} not found.`);
            continue;
        }

        if(!userId) userId=order.user.id

        const newOrderItem=orderItemRepo.create({
            order,
            product,
            quantity: item.quantity
        })

        console.log(newOrderItem);
        

        await orderItemRepo.save(newOrderItem)

    }

    if(userId) await cartRepo.delete({user:{id:userId}})



    return "order place successfully"
    
}