import mongoose from "mongoose";


const order = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId,ref: "post", required: true },

    addressId: {type: mongoose.Schema.Types.ObjectId, ref: "useraddress.address", required: true },

    totalAmount: {
      type: Number,
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },

        payablePrice: {
          type: Number,
          required: true,
        },
        
        purchasedQty: {
          type: Number,
          required: true,
        },
      },
    ],

    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refund"],
      required: true,
    },

    paymentType: {
      type: String,
      enum: ["cod", "card"],
      required: true,
    },

    orderStatus: [
      {
        type: {
          type: String,
          enum: ["ordered", "packed", "shipped", "delivered"],
          default: "ordered",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Orderschema = mongoose.model("order", order)

export default Orderschema

