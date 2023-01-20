const {createPaymentJsonService,executePaymentJsonService} = require("../services/paypalJsonService");
const {createPayment,executePayment} = require("../services/paypalPaymentService");

const seatArray = [
  {
    name: "1",
    price: "2",
    currency: "USD",
    quantity: 1,
  },
  {
    name: "2",
    price: "2",
    currency: "USD",
    quantity: 1,
  },
  {
    name: "3",
    price: "2",
    currency: "USD",
    quantity: 1,
  },
];

const eventBooking = async (req, res) => {
  try {
    let totalSum = 0;
    console.log("totalSum", totalSum);
    for (let data of seatArray) {
      totalSum += parseInt(data.price);
    }

    req.session.totalPrice = totalSum;
    console.log("req.session.totalPrice :>> ", req.session.totalPrice);

    let data = createPaymentJsonService(
      seatArray,
      `http://localhost:7899/success?total=${req.session.totalPrice}`,
      "http://localhost:7899/cancel",
      req.session.totalPrice
    );

    console.log(data);

    createPayment(data, (payment) => {
      console.log("payment:", payment);
      return res.json(payment);
    });
  } catch (error) {
    console.log(error);
  }
};

const successEventBooking = (req, res) => {
  console.log("req.session.totalPrice", req.session.totalPrice);
  try {
    const totalAmount = req.query.total;
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    let data = executePaymentJsonService(payerId, totalAmount);
    console.log(data);

    executePayment(paymentId, data, (message) => {
      return res.json(message);
    });
  } catch (error) {
    console.log(error);
  }
};

const failedEventBooking = (req, res) => {
  try {
    return res.json({ message: "Unable to pay" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  eventBooking,
  successEventBooking,
  failedEventBooking,
};
