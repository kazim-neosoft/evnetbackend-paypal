const dotenv = require('dotenv');
dotenv.config();


module.exports = {
	mode: process.env.PAYPAL_MODE,
    client_id: process.env.PAYPAL_CLIENT,
    client_secret: process.env.PAYPAL_SECRET
};