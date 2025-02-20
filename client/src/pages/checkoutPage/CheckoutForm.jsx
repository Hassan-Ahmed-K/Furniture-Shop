import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { clearCart } from "../../redux/reducers/cartReducer";
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({price, products}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const user = useSelector((state) => state.user.user);
  const verification_token = useSelector((state)=> state.auth.token) 
  const validationSchema = yup.object().shape({
    phone: yup
      .string()
      .matches(/^\d{10,15}$/, "Invalid phone number")
      .required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup
      .string()
      .matches(/^\d{4,10}$/, "Invalid ZIP code")
      .required("ZIP is required"),
    country: yup.string().required("Country is required"),
    paymentMethod: yup.string().required("Payment method is required"),
  });



  const handleSubmit = async (values, { resetForm }) => {
    if (!stripe || !elements) {
      console.log("Stripe has not loaded yet.");
      return;
    }

    try {
      if (!price || !user || !products || !verification_token) {
        console.error(
          "Missing required fields: price, user, products, or verification_token."
        );
        return;
      }

      let transactionId = "";

      if (values.paymentMethod === "CARD") {
        const cardElement = elements.getElement(CardElement);
        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
          console.error("Stripe Token Error:", error);
          return;
        }

        const response = await fetch(
          "https://furniture-shop-75qd.onrender.com/payment/card",
          {
            method: "POST",
            body: JSON.stringify({
              name: values.firstName,
              email: values.email,
              price: price,
              token: token.id,
            }),
            headers: {
              Authorization: `Bearer ${verification_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.id) {
          console.error("Payment failed:", data);
          return;
        }

        console.log("Payment successful, processing order...");
        transactionId = data.id; 
      }

      const order_response = await fetch(
        "https://furniture-shop-75qd.onrender.com/order",
        {
          method: "POST",
          body: JSON.stringify({
            user: user,
            products: products,
            price: price,
            paymentMethod: {
              method: values.paymentMethod,
              transactionId: transactionId, // ✅ Use transactionId for CARD, empty for COD
            },
          }),
          headers: {
            Authorization: `Bearer ${verification_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const orderData = await order_response.json();

      if (!order_response.ok) {
        console.error("Order Registration Failed:", orderData);
        return;
      }

      console.log("Order successfully placed!");

      const email_response = await fetch(
        "https://furniture-shop-75qd.onrender.com/email/send-email",
        {
          method: "POST",
          body: JSON.stringify({
            to: values.email,
            subject: "Order Placed - Furniture Store",
            message: "Thank you for ordering!",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const emailData = await email_response.json(); // ✅ Await response

      if (!email_response.ok) {
        console.error("Email sending failed:", emailData);
      } else {
        console.log("Order confirmation email sent!");
      }

      resetForm();
      dispatch(clearCart());
      navigate("/shop");
    } catch (error) {
      console.error("Payment Request Error:", error);
    }
  };



  return (
    <Formik
      initialValues={{
        phone: "",
        email: user?.email || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        paymentMethod: "CARD",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, resetForm }) => (
        <Form className="checkcout_form">
          {/* Contact Information */}
          <h3 className="section_heading">Contact Information</h3>
          <div className="contact_section  row">
            <div className="field input_container">
              <label htmlFor="email" className="block">
                Email:
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="input_field"
              />
              <ErrorMessage name="email" component="p" className="error" />
            </div>
            <div className="field input_container">
              <label htmlFor="phone" className="block">
                Phone Number:
              </label>
              <Field
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                className="input_field"
              />
              <ErrorMessage name="phone" component="p" className="error" />
            </div>
          </div>

          {/* Address Information */}
          <div className="address_section">
            <h3 className="section_heading">Address Information</h3>
            <div className="row">
              <div className="field input_container">
                <label htmlFor="firstName" className="block">
                  First Name:
                </label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  className="input_field"
                />
                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="error"
                />
              </div>
              <div className="field input_container">
                <label htmlFor="lastName" className="block">
                  Last Name:
                </label>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name"
                  className="input_field"
                />
                <ErrorMessage name="lastName" component="p" className="error" />
              </div>
            </div>
            <div className="row address_70_30">
              <div className="field address_field">
                <label htmlFor="address" className="block">
                  Street Address:
                </label>
                <Field
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                  className="input_field"
                />
                <ErrorMessage name="address" component="p" className="error" />
              </div>
              <div className="field zipcode_field">
                <label htmlFor="zip" className="block">
                  ZIP Code:
                </label>
                <Field
                  type="text"
                  name="zip"
                  id="zip"
                  placeholder="Enter ZIP code"
                  className="input_field"
                />
                <ErrorMessage name="zip" component="p" className="error" />
              </div>
            </div>
            <div className="row address_33">
              <div className="field">
                <label htmlFor="city" className="block">
                  City:
                </label>
                <Field
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Enter city"
                  className="input_field"
                />
                <ErrorMessage name="city" component="p" className="error" />
              </div>
              <div className="field">
                <label htmlFor="state" className="block">
                  State:
                </label>
                <Field
                  type="text"
                  name="state"
                  id="state"
                  placeholder="Enter state"
                  className="input_field"
                />
                <ErrorMessage name="state" component="p" className="error" />
              </div>
              <div className="field">
                <label htmlFor="country" className="block">
                  Country:
                </label>
                <Field
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Enter country"
                  className="input_field"
                />
                <ErrorMessage name="country" component="p" className="error" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment_section">
            <h3 className="section_heading">Payment Method</h3>
            <div className="row">
              <div className="field">
                <label>
                  <Field type="radio" name="paymentMethod" value="CARD" />
                  Card
                </label>
              </div>
              <div className="field">
                <label>
                  <Field type="radio" name="paymentMethod" value="COD" />
                  COD (Cash On Delivery)
                </label>
              </div>
            </div>
            <ErrorMessage
              name="paymentMethod"
              component="p"
              className="error"
            />
            {/* Card Payment Section */}
            {values.paymentMethod === "CARD" && (
              <div className="stripeContainer">
                <CardElement
                  className="field"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#666",
                        "::placeholder": { color: "#666" },
                        padding: "12px",
                        backgroundColor: "#FAFAFA",
                        border: "1px solid rgba(0, 0, 0, 0.07)",
                        borderRadius: "2px",
                        gap: "10px",
                      },
                      invalid: {
                        color: "red",
                      },
                    },
                    hidePostalCode: true, // Hides postal code field
                  }}
                />
                <ErrorMessage
                  name="cardDetails"
                  component="p"
                  className="error"
                />
              </div>
            )}

            {/* Error Message */}
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </div>
          

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className=""
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
