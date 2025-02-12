import express from "express";
import { stripePayment } from "../Controller/payment.js";
import { verify_token } from "../middleware/auth.js";


const router = express.Router();

router.post("/card", verify_token, stripePayment);

export default router