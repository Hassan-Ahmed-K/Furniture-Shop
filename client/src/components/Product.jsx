import { useState } from "react";
import cart_icon from "../assets/cart.svg";
import { useNavigate } from "react-router-dom";


const Product = ({ id, name, variations }) => {
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const colors = [];
  const navigate = useNavigate();

  


  const showVariration = (index) => {
    setSelectedVariationIndex(index)
  }

  return (
    <div className="product" data-id={id} >
      <p className="sales_tag">Sale!</p>
      <div className="options">
        <p className="cart">
          <object type="image/svg+xml" data={cart_icon}></object>
        </p>
        <p className="eye">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
          </svg>
        </p>
      </div>
      {variations.map((variation, index) => {
        const { image, color, orignal_price, sell_price } = variation;
        colors.push(color);

        return (
          <div
            key={`${name}-${color}`}
            className={`variation ${
              index === selectedVariationIndex ? "active" : ""
            }`}
            onClick={() => navigate(`/shop/${id}`)}
          >
            <img src={`http://localhost:5000/assets/${image}`} alt={name} />
            <div className={`details variation-${index}`}>
              <h3 className="product_name">{name}</h3>
              <div className="price">
                {orignal_price !== "" && (
                  <del className="orignal_price">${orignal_price}</del>
                )}
                <p className="current_price">${sell_price}</p>
              </div>

              {/* <div className="available_color">
                <span
                  style={{
                    backgroundColor: color,
                  }}
                ></span>
              </div> */}
            </div>
          </div>
        );
      })}

      <div className="available_color">
        {colors.map((color, index) => (
          <span
            key={`${color}-${index}`}
            style={{
              backgroundColor: color,
            }}
            onClick={() => showVariration(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Product;
