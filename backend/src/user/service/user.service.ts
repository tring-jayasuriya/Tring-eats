import bcrypt from "bcrypt";
import { AppDataSource } from "../../db/data-source";
import { User } from "../../entities/User";
import { generateToken } from "../../utils/generateJwtToken";


export async function login(email: string, password: string,type:string): Promise<string> {

const userRepository = AppDataSource.getRepository(User)

const user = await userRepository.findOne({ where: { email } })

if (!user) throw new Error("user not found")

const comparePassword = await bcrypt.compare(password, user.password)

console.log(">>>>> passwod hash");

if (!comparePassword) throw new Error("Invalid credentails")

const token = generateToken({ id: user?.id, type : type || "user" })

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