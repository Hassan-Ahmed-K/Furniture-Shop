import express from "express";
import { addOrder } from "../Controller/order.js";
import { verify_token } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verify_token, addOrder);

export default router;