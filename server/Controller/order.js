import Order from "../models/Order.js";


export const addOrder = async (req, res) => {
  try {
    const { user, products, price, paymentMethod } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ error: "Invalid products format" });
    }

    if (paymentMethod.method === "CARD" && !paymentMethod.transactionId) {
      return res
        .status(400)
        .json({ error: "Transaction ID is required for CARD payments" });
    }

    const filteredProducts = products.map(
      ({ _id, variation, quantity, name, variations }) => ({
        product_ref: _id,
        product: {
          name,
          color:variations[variation].color,
        },
        variation,
        quantity,
      })
    );

    const newOrder = new Order({
      user,
      products: filteredProducts,
      totalAmount: price,
      status: "pending",
      paymentMethod,
    });

    const savedOrder = await newOrder.save();
    res
      .status(200)
      .json({ message: "Order Successfully Placed", order: savedOrder });
  } catch (err) {
    console.error("Error in addOrder:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getOrderByUser = async (req, res) => {
  console.log("req.params = ", req.params);
  const userId = req.params.userId;
  console.log("userId = ", userId);
  const orders = await Order.find({ user: userId })
    .populate("products.product_ref")
    .sort({ createdAt: -1 });

  res.status(200).json({orders: orders});

}

