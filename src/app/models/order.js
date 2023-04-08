const mongoose = require("mongoose");
// A
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAmount: {
      type: String,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        purchasedQty: {
          type: Number,
          required: true,
        },
      },
    ],

    // orderStatus: [
    //   {
    //     type: {
    //       type: String,
    //       enum: ["ordered", "packed", "shipped", "delivered"],
    //       default: "ordered",
    //     },
    //     date: {
    //       type: Date,
    //     },
    //     isCompleted: {
    //       type: Boolean,
    //       default: false,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
