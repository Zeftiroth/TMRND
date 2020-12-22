const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderId: {type: String, required: true, unique: true},
    serviceNo: {type: Number, required: true},
    segment: {type: String, required: true},
    productName: {type: String, required: true},
    status: {type: String, required: true},
    remark: {type: String},
    state: {type: String}

  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
