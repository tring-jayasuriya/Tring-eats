const transporter=require('./mailconfig');
const {ORDER_CONFIRMED_TEMPLATE, ORDER_CANCELLED_TEMPLATE } = require('./mailTemplate');


const OrderConfirmationEmail=async(email)=>{

  try{

    const mailOptions={
        from: process.env.EMAIL_ID,
        to: email,
        subject: "Order status",
        html: ORDER_CONFIRMED_TEMPLATE
    }

    await transporter.sendMail(mailOptions)

  }catch(err){

    console.log("error from OrderConfirmationEmail ",err);
    
  }

}

const OrderCancellationEmail=async(email)=>{

  try{

    const mailOptions={
        from: process.env.EMAIL_ID,
        to: email,
        subject: "Order status",
        html:ORDER_CANCELLED_TEMPLATE
    }

    await transporter.sendMail(mailOptions)

  }catch(err){

    console.log("error from OrderCancellationEmail ",err);
    
  }

}



  module.exports={OrderCancellationEmail,OrderConfirmationEmail}
  