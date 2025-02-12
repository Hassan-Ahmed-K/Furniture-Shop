import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ subtotal }) => {
  const discountPercentage = useSelector(
    (state) => state.cart.discountPercentage || 0 // Ensure a default value
  );

  const navigate = useNavigate();

  const discountAmount = (subtotal * discountPercentage) / 100;
  const totalPrice = subtotal - discountAmount;

  return (
    <div className="order_summary">
      <h2 className="order_summary_heading">Cart total</h2>
      <div className="details">
        <div className="subtotal row">
          <p>Subtotal</p>
          <p className="price">${subtotal.toFixed(2)}</p>
        </div>

        <div className="discount row">
          <p>Discount ({discountPercentage}%)</p>
          <p className="price">- ${discountAmount.toFixed(2)}</p>
        </div>

        <div className="total row">
          <p>Total</p>
          <p className="price">${totalPrice.toFixed(2)}</p>
        </div>

        <div className="checkout_btn">
          <button onClick={() => navigate("/checkout")}>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
