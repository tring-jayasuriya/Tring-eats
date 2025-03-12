const { Query } = require("pg")
const { pool } = require("../../db/config")
const { query } = require("express")


const restaurantResolver={

    Mutation:{

        createRestaurant:async(_,{name,password,email,city,address})=>{
            try{

                const existingUser=await pool.query("SELECT * FROM restaurant WHERE email=$1",
                    [email]
                )

                if(existingUser.rowCount>0) throw new Error("email already exists")
                
                const res=await pool.query(
                    "INSERT INTO restaurant(name,password,email,city,address) VALUES ($1,$2,$3,$4,$5) RETURNING *",
                    [name,password,email,city,address]
                )

                console.log(res.rows[0]);
                console.log("restaurant  registration successfull");
                
                return res.rows[0]
                
            }catch(err){
                console.log("error from create user resolver");
                console.log(err.message);
                throw new Error(err.message)
            }
        },

        addToCart:async(_,{product_id, restaurant_id, user_id})=>{

            try{

                const res= await pool.query(
                    `select * from cart where restaurant_id != $1 and  user_id = $2` ,
                    [restaurant_id,user_id]
                )

                if(res.rowCount >0) throw new Error("you already have a other restaurant foods in the cart")
                
                const response=await pool.query(
                    `insert into cart(product_id, restaurant_id, user_id) values ($1, $2 , $3)`,
                    [product_id, restaurant_id, user_id]
                )
                return {message: "product added to cart"}

            }catch(err){

                console.log("error from add to  cart mutation ");
                console.log(err);
                throw new Error("you already have a other restaurant foods in the cart")
            }
        },

        deleteItem:async(_,{user_id, product_id})=>{

            try{

                const res=await pool.query(
                    `delete from cart where product_id=$1 and user_id=$2`,
                    [product_id,user_id]
                )

                return {message:"item removed from cart"}

            }catch(err){
                console.log("error from delete item resolver");
                
            }

        },

        confirmOrder:async(_,{user_id,total_price,orderItems})=>{

            try{
                console.log(user_id,total_price,orderItems);

                const item=orderItems[0].product_id

                const response=await pool.query(
                    `select restaurant_id from products where id=$1`,
                    [item]
                )

                const restaurant_id=response.rows[0].restaurant_id

                const res=await pool.query(
                    `insert into orders(user_id,total_price,restaurant_id) values($1,$2,$3) returning order_id`,
                    [user_id,total_price,restaurant_id]
                )

                const order_id=res.rows[0]?.order_id

                if(!order_id) return {order_id:null,message:"order failed",success:false}

                for(let items of orderItems){

                    await pool.query(
                        `insert into orderItems(order_id, product_id, quantity) values($1,$2,$3)`,
                        [order_id, items.product_id, items.quantity]
                    )
                }

                return {order_id:order_id,message:"order confirmed",success:true}

            }catch(err){
            
                console.log("error from confirm order",err);
                throw new Error(err.message)
            }
        },

        updateRestaurantStatus:async(_,{id,isopen})=>{

            try{

                const res=await pool.query(
                    `update restaurant set isopen=$2 where id=$1 returning isopen`,
                    [id,isopen]
                )

                return res.rows[0]

            }catch(err){
                console.log("error from update restaurant status",err);
                
            }

        },

        orderStatus:async(_,{orderId,orderStatus})=>{

            try{
                const res=await pool.query(
                    `update orders set order_status = $1 where order_id=$2 `,
                    [orderStatus,orderId]
                )

                return "alter succcess"

            }catch(err){
                console.log("error from order status resolver",err);
            }
        }

    },

    Query:{

        getRestaurant:async(_,{email,password})=>{
            
            try{
                const res=await pool.query(
                    "SELECT * from restaurant where email=$1",
                    [email]
                )

                if(res.rowCount===0)  return {emailError:true}
            
                const checkPassword=res.rows[0].password

                if(checkPassword!==password) return {passwordError:true}
                
                return {...res.rows[0],isAuthenticated:true}

            }catch(err){
                throw new Error(err)
            }
        },

        getDishes:async(_,{page})=>{

            try{

                const offset=(page-1)*12
                console.log("log from get dishes");
    
                const res=await pool.query(
                    `select p.name , p.image, p.price, p.restaurant_id , p.id , r.name as restaurant_name  from products p left join restaurant r on p.restaurant_id=r.id limit 12 offset ${offset}`
                )
                
                return res.rows

            }catch(err){

                console.log("err from get dishes resolver",err);

            }

        },

        getRest:async(_,{page})=>{

            try{

                const offset=(page-1)*12
                console.log("log from get restuarant");
    
                const res=await pool.query(
                    `select * from restaurant limit 12 offset ${offset}`
                )
                
                return res.rows

            }catch(err){
                console.log("err from get restaurant resolver",err);
            }
                
        },

        getCartItems:async(_,{id})=>{
            try{
                console.log(">>> cart items");
                
                const res=await pool.query(
                    `SELECT 
                        p.id , 
                        p.name,
                        p.price, 
                        p.image,
                        r.name AS restaurant_name,
                        r.id as restaurant_id
                    FROM cart c
                    JOIN products p ON c.product_id = p.id
                    JOIN restaurant r ON c.restaurant_id = r.id
                    WHERE c.user_id = $1;`,
                    [id]
                )
                
                return res.rows

            }catch(err){
                console.log("error get cart items resolver");
                console.log(err);
            }

        },

        getMenu:async(_,{id})=>{

            try{

                const res=await pool.query(
                    `select * from products where restaurant_id=$1`,
                    [id]
                )

                console.log(res.rows[0]);
                
                return res.rows

            }catch(err){
                console.log("error from get menu resolver");
                throw new Error(err.message)
            }

        },

        getStatus:async(_,{id})=>{

            try{
                const res=await pool.query(
                    `select isopen from restaurant where id=$1`,
                    [id]
                )

                if(res.rowCount<=0) throw new Error("restaurant not found")
                
                return res.rows[0]

            }catch(err){
                console.log("error from get status",err);
                throw new Error(err)
            }
        },

        orderDetails:async(_,{id})=>{

            try{
                const res=await pool.query(
                    `SELECT o.order_id, u.id AS user_id, u.name AS user_name,p.id AS product_id, p.name AS product_name,
                    oi.quantity, (oi.quantity * p.price) AS total_price, o.order_status, o.total_price
                    FROM orders o JOIN users u ON o.user_id = u.id
                    JOIN restaurant r ON o.restaurant_id = r.id
                    JOIN orderItems oi ON oi.order_id = o.order_id
                    JOIN products p ON oi.product_id = p.id WHERE r.id = $1 
                    ORDER BY o.order_id;
                     `,
                     [id]
                )

                return res.rows
                

            }catch(err){
                console.log("error from order details resolver",err);
                throw new Error(err)
            }
        },

        searchDish:async(_,{name,page})=>{

            try{

                const offset=(page-1)*12

                const res=await pool.query(
                    `select p.*, r.name as restaurant_name from products p
                    join restaurant r on r.id = p.restaurant_id where p.name ilike $1 limit 12 offset $2`,
                    [`%${name}%`,offset]
                )

                return res.rows

            }catch(err){
                console.log("error from search dish",err);
                throw new Error(err)
            }

        },

        getOrderHistory:async(_,{id})=>{
            try{
                
                const res = await pool.query(
                    `
                    SELECT o.order_id, r.id AS restaurant_id, r.name AS restaurant_name, u.id AS user_id, 
                    u.name AS user_name, p.id AS product_id, p.name AS product_name, oi.quantity, 
                    (oi.quantity * p.price) AS total_price, o.order_status
                    FROM orders o
                    JOIN users u ON o.user_id = u.id
                    JOIN restaurant r ON o.restaurant_id = r.id
                    JOIN orderItems oi ON oi.order_id = o.order_id
                    JOIN products p ON oi.product_id = p.id
                    WHERE u.id = $1 
                    ORDER BY o.order_id
                    `,
                    [id]
                );
                return res.rows
                
            }catch(err){
                console.log("error from get order history",err)
            }

        }



    }
}

module.exports=restaurantResolver