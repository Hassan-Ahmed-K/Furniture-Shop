import express from "express";
import { send_email } from "../Controller/email.js";

const router = express.Router();


router.post("/send-email",send_email);


export default router;