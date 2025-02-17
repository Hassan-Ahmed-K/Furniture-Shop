import express from "express";
import { addOrder, getOrderByUser } from "../Controller/order.js";
import { verify_token } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verify_token, addOrder);

router.get("/trackOrder/:userId", getOrderByUser);

export default router;