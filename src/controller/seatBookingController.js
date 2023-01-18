const paypalConfig = require("../config/paypalConfig");
const paypal=require('paypal-rest-sdk');
paypal.configure(paypalConfig);

const seatBooking=async(req,res)=>{
    // console.log('req :>> ', req);
    // console.log('req', req)
    try {
        const seatArray=[{
            seatNum:"1",
            price:1,
            "currency": "USD"
        }];
        let totalSum=0;
        console.log('totalSum', totalSum)
        for(let data of seatArray){
            totalSum+=data.price
            console.log('data.price :>> ', data.price);
            console.log('totalSum', totalSum)
        }
        req.session.totalPrice=totalSum;
        console.log('req.session.totalPrice :>> ', req.session.totalPrice);

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:7899/success",
                "cancel_url": "http://localhost:7899/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": seatArray
                },
                "amount": {
                    "currency": "USD",
                    "total": req.session.totalPrice+""
                },
                "description": "welcome to my booking"
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(const element of payment.links){
                  if(element.rel === 'approval_url'){
                    res.redirect(element.href);
                  }
                }
            }
          });

    } catch (error) {
        console.log(error);
    }
}

const successBooking=(req,res)=>{
    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
      
        const execute_payment_json = {
          "payer_id": payerId,
          "transactions": [{
              "amount": {
                  "currency": "USD",
                  "total": req.session.totalPrice+""
              }
          }]
        };
      
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
          if (error) {
              console.log(error.response);
              throw error;
          } else {
              console.log(JSON.stringify(payment));
              res.json({message:`Thanks for paying ${req.session.totalPrice}`});
          }
      });
        
    } catch (error) {
        console.log(error);
    }
}

const failedBooking=(req,res)=>{
    try {
        res.json({message:'Unable to pay'})
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    seatBooking,
    successBooking,
    failedBooking
}