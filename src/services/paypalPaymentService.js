const paypal=require('paypal-rest-sdk');
const { mode, client_id, client_secret } = require("../config/paypalConfig");

paypal.configure({mode,client_id,client_secret})

const createPayment=(data, callback)=>{
    try {
        paypal.payment.create(data, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(const element of payment.links){
                  if(element.rel === 'approval_url'){
                    callback({paymenturl:element.href})
                  }
                }
            }
          });
    } catch (error) {
        console.log(error);
    }
}

const executePayment=(paymentId,data,callback)=>{
    try {

        paypal.payment.execute(paymentId, data, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                if(payment.state=='approved'){
                  console.log('Seat Book Kijye');
                  callback({message:`Thanks for paying ${data.transactions[0].amount.total} USD`})
                }
            }
        });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    createPayment,
    executePayment
}
