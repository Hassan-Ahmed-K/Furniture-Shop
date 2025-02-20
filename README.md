# Furniture Shop - Full-Stack E-commerce Website

## 🚀 Live Demo
Frontend: [Furniture Shop](https://furniture-store-hassan.netlify.app/)

📌 **Note:** The backend is hosted on Render, which may cause a **50-second delay** when loading products initially due to server cold starts.

📽️ **Demo Video:** [Watch Here](https://youtu.be/b8mtcHRX2gI)

---

## 📌 Overview
Furniture Shop is a **full-stack e-commerce website** that allows users to browse, add products to the cart, and complete purchases using **Stripe for payments**. Users also receive **order confirmation emails** via SMTP and can subscribe to the newsletter.

### ✨ Key Features:
- **User Authentication** (Register/Login)
- **Product Catalog & Categories**
- **Shopping Cart & Checkout**
- **Secure Payments (Stripe Integration)**
- **Order Confirmation via Email (SMTP)**
- **Newsletter Subscription**
- **Admin Panel for Managing Products & Orders**

## 🛠️ Tech Stack

### **Frontend:**
- **React.js 19** (Component-based UI)
- **Redux Toolkit** (State management)
- **SCSS** (Custom styling)
- **Formik & Yup** (Form handling & validation)

### **Backend:**
- **Node.js** + **Express.js** (API & Business Logic)
- **MongoDB** (NoSQL Database)
- **Mongoose** (ODM for MongoDB)
- **Nodemailer** (SMTP setup for emails)
- **Stripe API** (Payment Processing)

## 📂 File Structure

### **Frontend (`/client`):**
```
client/
├── public/             # Public assets
├── src/
│   ├── assets/         # Images & Icons
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page views (Home, Shop, Cart, etc.)
│   ├── redux/          # State management
│   │   ├── reducers/   # Redux reducers
│   │   ├── store.js    # Redux store
│   ├── styles/         # SCSS styling
│   │   ├── components/
│   │   ├── pages/
│   │   ├── main.scss
│   ├── App.js          # Main app entry
│   ├── index.js        # React DOM rendering
│   ├── index.css
├── package.json        # Frontend dependencies
└── README.md           # Documentation
```

### **Backend (`/server`):**
```
server/
├── Controllers/        # Business logic for API routes
├── data/               # Database seeding files
├── middleware/         # Authentication & error handling
├── models/             # MongoDB models (Order, Product, User)
├── Routes/             # API routes (Orders, Users, Products)
├── public/
│   ├── assets/         # Static assets
├── app.js              # Express server entry point
├── connectDB.js        # MongoDB connection
├── SMTP_Setup.js       # Nodemailer SMTP setup
├── package.json        # Backend dependencies
└── README.md           # Documentation
```

## 📊 Database Models

### **Order Model (`models/Order.js`):**
```js
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product_ref: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        product: { name: String, color: String },
        variation: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
    paymentMethod: { method: { type: String, enum: ["CARD", "COD"], required: true }, transactionId: { type: String, default: null } },
  },
  { timestamps: true }
);
```

### **Product Model (`models/Product.js`):**
```js
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  variations: [
    {
      color: { type: String, required: true },
      orignal_price: { type: Number },
      sell_price: { type: Number, required: true },
      stock: { type: Number, required: true },
      image: { type: String },
    },
  ],
}, {timestamps: true});
```

### **User Model (`models/User.js`):**
```js
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  { timestamps: true }
);
```

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Hassan-Ahmed-K/furniture-shop.git
cd furniture-shop
```

### **2️⃣ Install Dependencies**
#### **Frontend:**
```sh
cd client
npm install
```
#### **Backend:**
```sh
cd server
npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file in the `server/` directory and add the following:
```env
MONGDB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=your_smtp_host
GMAIL_EMAIL=your_smtp_port
GMAIL_APP_PASSWORD=your_smtp_email
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### **4️⃣ Run the Application**
#### **Frontend:**
```sh
npm start
```
#### **Backend:**
```sh
npm run dev
```

## 📜 License
This project is licensed under the MIT License.

## 🤝 Contributions
Contributions are welcome! Feel free to fork the repository and submit pull requests.

## 📬 Contact
If you have any questions, feel free to reach out:
📧 Email: hassanahmedkhan1st@gmail.com

---
**Happy Coding! 🚀**

