import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      postalCode,
      contactNumber,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !address ||
      !postalCode ||
      !contactNumber
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      role: "customer",
      address,
      postalCode,
      contactNumber,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ message: "User registered successfully", user: savedUser,token:token });
  } catch (err) {
    console.error("Error in register:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};



export const login = async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json("User Not Found");
        }
        const match = bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json("Invalid Credentials");
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.status(200).json({user,token});
    } catch(err){
        res.status(500).json({error:err.message});
    }

}

