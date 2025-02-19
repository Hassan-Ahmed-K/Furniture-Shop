import { useSelector } from "react-redux";
import NavBar from "../../components/nav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderTrackPage = () => {
  const userId = useSelector((state) => state.user.user)?._id || null;
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://furniture-shop-75qd.onrender.com/order/trackOrder/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User Orders:", data);
        setOrders(data.orders); // Update state with orders
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, [userId]);



  return (
    <>
      <NavBar />

      <section className="order_track">
        <div className="wrap_order_track">
          <div className="inner_container">
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="order_card">
                  <div className="detail">
                    <div className="ids">
                      <p className="orderId">Order ID: {order._id}</p>
                      {order.paymentMethod.method === "CARD" && (
                        <p className="orderId">
                          Transaction ID: {order.paymentMethod.transactionId}
                        </p>
                      )}
                    </div>
                    <p className="status">Status: {order.status}</p>
                  </div>

                  <table className="order_table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Color</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <img
                              className="cart-img"
                              src={`https://furniture-shop-75qd.onrender.com/assets/${
                                item.product_ref.variations[item.variation]
                                  .image
                              }`}
                              alt="Product Image"
                            />
                          </td>
                          <td
                            className="product_name"
                            onClick={() =>
                              navigate(`/shop/${item.product_ref._id}`)
                            }
                          >
                            {item.product_ref.name}
                          </td>
                          <td className="color">
                            <span
                              style={{
                                backgroundColor:
                                  item.product_ref.variations[item.variation]
                                    .color,
                              }}
                            ></span>
                          </td>
                          <td>{item.product_ref.category}</td>
                          <td>{item.quantity}</td>
                          <td>
                            {(
                              item.product_ref.variations[item.variation]
                                .sell_price * item.quantity
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            paddingTop: "10px",
                          }}
                        >
                          Ordered on:
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td
                          colSpan="2"
                          style={{
                            textAlign: "left",
                            fontStyle: "bold",
                            paddingTop: "10px",
                          }}
                        >
                          Payment Method: {order.paymentMethod.method}
                        </td>
                        <td
                          colSpan="2"
                          style={{
                            textAlign: "right",
                            fontStyle: "bold",
                            paddingTop: "10px",
                          }}
                        >
                          Total Amount:
                        </td>
                        <td>${order.totalAmount.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="order_table mobile">
                    {order.products.map((item) => (
                      <div key={item._id}>
                        <div className="container">
                          <div className="left_col">
                            <div className="product-image">
                              <img
                                className="cart-img"
                                src={`https://furniture-shop-75qd.onrender.com/assets/${
                                  item.product_ref.variations[item.variation]
                                    .image
                                }`}
                                alt="Product Image"
                              />
                            </div>
                          </div>
                          <div className="right_col">
                            <div
                              className="product_name row"
                              onClick={() =>
                                navigate(`/shop/${item.product_ref._id}`)
                              }
                            >
                              {item.product_ref.name}
                            </div>

                            <div className="color row">
                              <span
                                style={{
                                  backgroundColor:
                                    item.product_ref.variations[item.variation]
                                      .color,
                                }}
                              ></span>
                            </div>

                            <div className="row">
                              {item.product_ref.category}
                            </div>
                            <div className="row">{item.quantity}</div>
                            <div className="row">
                              {(
                                item.product_ref.variations[item.variation]
                                  .sell_price * item.quantity
                              ).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderTrackPage;
