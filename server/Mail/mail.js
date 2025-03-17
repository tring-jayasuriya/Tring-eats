const transporter=require('./mailconfig');
const VERIFICATION_EMAIL_TEMPLATE = require('./mailTemplate');


const SendverificationEmail=async(email,verificationCode)=>{
    console.log(process.env.EMAIL_ID);
    console.log(process.env.EMAIL_PASS_KEY);
    console.log("user email",email);
    console.log("verification code",verificationCode);
    

    
    
    try{

      const mailOptions ={
        from: process.env.EMAIL_ID,
        to: email,
        subject: "verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationCode),
      }

      const response=await transporter.sendMail(mailOptions)
      console.log("email response >>> send verification email",response);
      
    }catch(err){
      console.log("error from send mail",err)
      throw new Error(err)
    }
  
  } 

  module.exports=SendverificationEmail
  