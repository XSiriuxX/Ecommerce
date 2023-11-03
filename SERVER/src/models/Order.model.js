const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  productList: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
      productName: String,
    },
  ],
  purchaseDate: Date,
  orderStatus: String,
  billingInfo: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Order", orderSchema);
