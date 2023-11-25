const { Router } = require("express");
const router = Router();

const payment = require("../controllers//payment.controller");

router.post("/createorder", payment.createOrder);
router.post("/webhook", payment.recieveWebhook);

router.get("/success", payment.success);
router.get("/failure", payment.success);
router.get("/pending", payment.success);

module.exports = router;
