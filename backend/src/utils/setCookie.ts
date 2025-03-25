

export const setCookie=(res:any,token:string)=>{
  console.log("set cookie started");
  
    res.cookie("jwttoken", token, {
        httpOnly: true,  // Prevents JavaScript access (for security)
        secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
        sameSite: "lax", // Allows cross-site requests while protecting CSRF
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days expiration
      });

      console.log("set cookie ended");
}