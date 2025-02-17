import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product_ref: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        product: {
          // Corrected object structure
          name: {
            type: String,
            required: true,
          },
          color: {
            // Changed duplicate key to 'description'
            type: String,
            required: true,
          },
        },
        variation: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },

    paymentMethod: {
      method: {
        type: String,
        enum: ["CARD", "COD"], // Payment methods: Card or Cash on Delivery
        required: true,
      },
      transactionId: {
        type: String, // Store transaction ID if payment is done via CARD
        default: null, // Set to null for COD payments
      },
    },
  },
  { timestamps: true }
);





const Order = mongoose.model("Order", orderSchema);

export default Order;
