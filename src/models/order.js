const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const Invoice = require("../models/invoice");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = Schema(
  {
    status: {
      type: String,
      enum: ["waiting_payment", "processing", "in_delivery", "delivered"],
      default: "waiting_payment",
    },
    delivery_fee: {
      type: Number,
      default: 0,
    },
    delivery_address: {
      provinsi: { type: String, required: true },
      kota: { type: String, required: true },
      kecamatan: { type: String, required: true },
      kelurahan: { type: String, required: true },
      detail: { type: String },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // order_items: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
    cart: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true, min: 1 },
        price: { type: Number, default: 0 },
        image_url: String,
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  { timestamps: true }
);

// orderSchema.plugin(AutoIncrement, { inc_field: "order_number" });
// orderSchema.virtual("items_count").get(function () {
//   // return this.order_items.reduce(
//   return this.cart.reduce((total, item) => total + parseInt(item.qty), 0);
// });
// orderSchema.post("save", async function () {
//   // const sub_total = this.order_items.reduce(
//   const sub_total = this.cart.reduce(
//     (total, item) => (total += item.price * item.qty),
//     0
//   );
//   const invoice = new Invoice({
//     user: this.user,
//     order: this._id,
//     sub_total,
//     delivery_fee: parseInt(this.delivery_fee),
//     total: parseInt(sub_total + this.delivery_fee),
//     delivery_address: this.delivery_address,
//   });
//   await invoice.save();
// });
module.exports = model("Order", orderSchema);
