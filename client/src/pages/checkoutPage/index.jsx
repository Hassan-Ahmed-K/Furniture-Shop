import { useEffect, useState } from "react";
import NavBar from "../../components/nav";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const discountPercentage = useSelector((state) => state.cart.discountPercentage || 0 );
    // console.log(cartItems);
    const [product, setProduct] = useState([]);
    console.log(product);
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const productData = await Promise.all(
            cartItems.map(async (item) => {
              try {
                const response = await fetch(
                  `http://localhost:5000/products/${item.id}`
                );

                if (!response.ok) {
                  throw new Error("Failed to fetch Product");
                }

                const data = await response.json();
                return {
                  ...data,
                  variation: item.variation,
                  quantity: item.quantity,
                };
              } catch (err) {
                return null;
              }
            })
          );

          setProduct(productData.filter(Boolean));
          
          console.log("product = ", product);
    
        } catch (err) {
          console.error("ERROR:", err);
          setProduct([]);
        }
      };

      fetchProduct();
    }, [cartItems])

    const subtotal = product.reduce(
        (acc, item) =>
          acc +
          (item.variations?.[item.variation]?.sell_price || 0) *
            (item.quantity || 1),
        0
      );

    const discountAmount = (subtotal * discountPercentage) / 100;
    const totalPrice = subtotal - discountAmount;
     
    return (
      <>
        <NavBar />
        <section className="checkout_section">
          <div className="wrap_checkout_section">
            <div className="form_heading">Checkout</div>
            <div className="inner_container">
              <div className="left_col">
                <Elements stripe={stripePromise}>
                  <CheckoutForm price={totalPrice} />
                </Elements>
              </div>
              <div className="right_col">
                <h2>Your Order</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.map((item) => (
                      <tr key={item.id}>
                        <td className="product_col">
                          <img
                            src={`http://localhost:5000/assets/${
                              item.variations[item.variation].image
                            }`}
                            alt=""
                          />
                          {item.name} {item.variations[item.variation].color} x
                          {item.quantity}
                        </td>
                        <td>
                          $
                          {item.variations[item.variation].sell_price *
                            item.quantity}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="row_title">Subtotal</td>
                      <td>${subtotal}</td>
                    </tr>
                    <tr>
                      <td>Discount ({discountPercentage}%)</td>
                      <td>- ${discountAmount.toFixed(2)}</td>
                    </tr>
                    <tr className="total_row">
                      <td>Total</td>
                      <td>${totalPrice.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default CheckoutPage;