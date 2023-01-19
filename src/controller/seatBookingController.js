const {mode,client_id,client_secret} = require("../config/paypalConfig");
const paypal=require('paypal-rest-sdk');
// paypal.configure({mode,client_id,client_secret});
paypal.configure({
    mode:'sandbox',
    client_id:'AYNcZtoiThBeKcfhdi4_zt1VEyPAOu9R-5D96FJqHMUh94YIaop4inqRHty4U2MumskphTtVyFX7194u',
    client_secret:'EBAQMoM3C-lsxAW16gL3VcTGD_6G_ZvtysW5uLqU8X9Q6jnuBl6jPGwMXN4diluI1BuEP3qF49krAcLh'
})

const seatBooking=async(req,res)=>{
    try {
        const seatArray=[{
            "name":"1",
            "price":"2",
            "currency": "USD",
            "quantity":1
        },
        {
            "name":"2",
            "price":"2",
            "currency": "USD",
            "quantity":1
        },
        {
            "name":"3",
            "price":"2",
            "currency": "USD",
            "quantity":1
        }]

        let totalSum=0;
        console.log('totalSum', totalSum)
        for(let data of seatArray){
            totalSum+=parseInt(data.price)
        }
        
        req.session.totalPrice=totalSum;
        console.log('req.session.totalPrice :>> ', req.session.totalPrice);

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `http://localhost:7899/success?total=${req.session.totalPrice}`,
                "cancel_url": "http://localhost:7899/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": seatArray
                },
                "amount": {
                    "currency": "USD",
                    "total": req.session.totalPrice,
                    
            },
            "description": "Hat for the best team ever"
        }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(const element of payment.links){
                  if(element.rel === 'approval_url'){
                    console.log('element.href', element.href)
                    // res.redirect(element.href);
                    return res.json({paymenturl:element.href})
                  }
                }
                // return res.json({data:arr})
            }
          });

    } catch (error) {
        console.log(error);
    }
}

const successBooking=(req,res)=>{
    console.log('req.session.totalPrice', req.session.totalPrice)
    try {
        const totalAmount=req.query.total;
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        
        const execute_payment_json = {
          "payer_id": payerId,
          "transactions": [{
              "amount": {
                  "currency": "USD",
                  "total":totalAmount
              }
          }]
        };
      
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
          if (error) {
              console.log(error.response);
              throw error;
          } else {
              console.log(JSON.stringify(payment));
              console.log(payment.state);
              res.json({message:`Thanks for paying ${totalAmount} USD`});
          }
      });
        
    } catch (error) {
        console.log(error);
    }
}

const failedBooking=(req,res)=>{
    try {
        return res.json({message:'Unable to pay'})
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    seatBooking,
    successBooking,
    failedBooking
}