const ORDER_CONFIRMED_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #F8B602; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Order Confirmed</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We are pleased to inform you that your order has been successfully confirmed.</p>
    <p>Your order will be prepared and delivered shortly. You can track your order status from your account.</p>
    <p>Thank you for choosing our service!</p>
    <p style="fonnt-weigth:600">Best regards,<br>Team TRING<span style="color:green">EATS</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email</p>
  </div>
</body>
</html>
`;


const ORDER_CANCELLED_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale: 1.0">
  <title>Order Cancelled</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #F8B602; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Order Cancelled</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We regret to inform you that your order has been cancelled.</p>
    <p>If you would like to place a new order, feel free to visit our app again.</p>
    <p style="fonnt-weigth:600">Best regards,<br>Team TRING<span style="color:green">EATS</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


module.exports={ORDER_CONFIRMED_TEMPLATE,ORDER_CANCELLED_TEMPLATE }