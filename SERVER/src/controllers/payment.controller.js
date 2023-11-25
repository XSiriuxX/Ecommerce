const mercadopago = require("mercadopago");
const payment = {};
require("dotenv").config();

payment.createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_TOKEN,
  });

  const result = await mercadopago.preferences.create({
    items: req.body,
    back_urls: {
      success: `${process.env.HOST}/payments/success`,
      failure: `${process.env.HOST}/payments/failure`,
      pending: `${process.env.HOST}/payments/pending`,
    },
    notification_url: "https://19bf-190-237-16-205.ngrok.io/payments/webhook",
  });

  res.status(200).json(result.body);
};

payment.recieveWebhook = async (req, res) => {
  const payment = req.query;

  try {
    if (payment.type === "payment") {
      const response = await mercadopago.payment.findById(payment["data.id"]);
    }
    res.status(200).json("Todo bien");
  } catch (error) {
    console.log(error);
  }
};

payment.success = async (req, res) => {
  res.status(200).json("success");
};

module.exports = payment;
