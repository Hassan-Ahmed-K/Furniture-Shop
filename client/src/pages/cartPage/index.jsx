import { useSelector } from "react-redux"
import NavBar from "../../components/nav"
import Cart from "../../components/Cart";
import OrderSummary from "../../components/orderSummary";
import { useState } from "react";


const CartPage = () => {
  const [price, setPrice] = useState(0);


  return (
    <>
      <NavBar />
      <section className="cart_section">
        <div className="wrap_cart_section">
          <div className="inner_container">
            <h2>Cart</h2>
            <div className="cart">
              <div className="left_col">
                <Cart setPrice={setPrice} />
              </div>
              <div className="right_col">
                <OrderSummary subtotal={price} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
