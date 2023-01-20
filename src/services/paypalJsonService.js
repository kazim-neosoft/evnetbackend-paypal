const {create_payment_json,execute_payment_json} = require("../utils/paymentJsonData");

const createPaymentJsonService=(seatArray,return_url,cancel_url,totalPrice)=>{
    create_payment_json.transactions[0].item_list.items=seatArray
    create_payment_json.redirect_urls.return_url=return_url
    create_payment_json.redirect_urls.cancel_url=cancel_url
    create_payment_json.transactions[0].amount.total=totalPrice

    return create_payment_json
}

const executePaymentJsonService=(payerId,totalAmount)=>{
    execute_payment_json.payer_id=payerId
    execute_payment_json.transactions[0].amount.total=totalAmount

    return execute_payment_json
}

module.exports={
    createPaymentJsonService,
    executePaymentJsonService
}