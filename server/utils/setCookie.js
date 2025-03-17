
const setCookie=(token,res)=>{

    console.log(res);
    

    res.cookie("jwttoken",token,{
        httpOnly:true,
        maxAge: 24 * 7 * 60 * 60 * 1000
    })
    

}

module.exports=setCookie