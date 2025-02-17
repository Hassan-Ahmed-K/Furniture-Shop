import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripePayment = async (req, res) => {
  try {
    const { name, email, price, token } = req.body; 
    if (!token) {
      return res.status(400).json({ error: "Payment token is required" });
    }

    const idempotencyKey = uuidv4();

    const customer = await stripe.customers.create({
      email: email,
      source: token, 
      name: name,
    });

    const charge = await stripe.charges.create(
      {
        amount: Math.round(price * 100),
        currency: "usd",
        customer: customer.id,
        receipt_email: email,
        description: `Purchase by ${name}`,
      },
      { idempotencyKey }
    );

    return res.status(200).json(charge);
  } catch (error) {
    console.error("Stripe Payment Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export default stripePayment;
