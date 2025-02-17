import { useDispatch, useSelector } from "react-redux";
import { setQuantity, removeFromCart } from "../redux/reducers/cartReducer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ setPrice }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setProduct([]);
      return;
    }

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
        
      } catch (err) {
        console.error("ERROR:", err);
        setProduct([]);
      }
    };

    fetchProduct();
    
  }, [cartItems]);

  const increaseQuantity = (id, currentQuantity, maxStock) => {
    if (currentQuantity < maxStock) {
      dispatch(setQuantity({ id, quantity: currentQuantity + 1 }));
    }
  };

  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(setQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const removeItem = (id,variation) => {
    dispatch(removeFromCart({ id, variation }));
  };

  const subtotal = product.reduce(
    (acc, item) =>
      acc +
      (item.variations?.[item.variation]?.sell_price || 0) *
        (item.quantity || 1),
    0
  );

  setPrice(subtotal);

  return (
    <>
      <table className="cart-table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item) => {
            const selectedVariation = item.variations?.[item.variation] || {};

            return (
              <tr key={item._id}>
                <td>
                  <span
                    className="remove-btn"
                    onClick={() => removeItem(item._id, item.variation)}
                  >
                    <svg
                      className="ast-mobile-svg ast-close-svg"
                      fill="currentColor"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
                    </svg>
                  </span>
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/assets/${
                      selectedVariation.image || "default.jpg"
                    }`}
                    alt={item.name}
                    className="cart-img"
                  />
                </td>
                <td
                  className="product_name"
                  onClick={() => navigate(`/shop/product/${item._id}`)}
                >
                  {item.name} ({selectedVariation.color || "Default"})
                </td>
                <td>${selectedVariation.sell_price?.toFixed(2) || "N/A"}</td>
                <td>
                  <div className="quantity_control">
                    <button
                      className="decrease"
                      onClick={() => decreaseQuantity(item._id, item.quantity)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={item.quantity}
                      min="1"
                      readOnly
                    />
                    <button
                      className="increase"
                      onClick={() =>
                        increaseQuantity(
                          item._id,
                          item.quantity,
                          selectedVariation.stock
                        )
                      }
                      disabled={item.quantity >= selectedVariation.stock} // Disable if quantity reaches stock
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  $
                  {selectedVariation.sell_price
                    ? (selectedVariation.sell_price * item.quantity).toFixed(2)
                    : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5" style={{ textAlign: "right", fontWeight: "bold" }}>
              Grand Total:
            </td>
            <td style={{ fontWeight: "bold" }}>${subtotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="cart-table mobiile_cart">
        {product?.map((item) => {
          const selectedVariation = item.variations?.[item.variation] || {};

          return (
            <div key={item._id}>
              <div className="remove-item">
                <span
                  className="remove-btn"
                  onClick={() => removeItem(item._id, item.variation)}
                >
                  <svg
                    className="ast-mobile-svg ast-close-svg"
                    fill="currentColor"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
                  </svg>
                </span>
              </div>

              <div className="container">
                <div className="left_col">
                  <div className="product-image">
                    <img
                      src={`http://localhost:5000/assets/${
                        selectedVariation.image || "default.jpg"
                      }`}
                      alt={item.name}
                      className="cart-img"
                    />
                  </div>
                </div>
                <div className="right_col">
                  <div
                    className="row product_name"
                    onClick={() => navigate(`/shop/product/${item._id}`)}
                  >
                    {item.name} ({selectedVariation.color || "Default"})
                  </div>

                  <div className="row">
                    <span>Price:</span>
                    <span>
                      ${selectedVariation.sell_price?.toFixed(2) || "N/A"}
                    </span>
                  </div>

                  <div className="row">
                    <div className="quantity_control">
                      <button
                        className="decrease"
                        onClick={() =>
                          decreaseQuantity(item._id, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={item.quantity}
                        min="1"
                        readOnly
                      />
                      <button
                        className="increase"
                        onClick={() =>
                          increaseQuantity(
                            item._id,
                            item.quantity,
                            selectedVariation.stock
                          )
                        }
                        disabled={
                          item.quantity >= (selectedVariation.stock ?? Infinity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <span>Subtotal: </span>
                    <span>
                      $
                      {selectedVariation.sell_price
                        ? (
                            selectedVariation.sell_price * item.quantity
                          ).toFixed(2)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

};

export default Cart;
