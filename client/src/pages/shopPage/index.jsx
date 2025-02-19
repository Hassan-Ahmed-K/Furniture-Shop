import { useNavigate } from "react-router-dom";
import NavBar from "../../components/nav";
import { useEffect, useState } from "react";
import Product from "../../components/Product";
import Breadcrumbs from "../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsSuccess } from "../../redux/reducers/productReducer.js";


const Shop = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState(useSelector((state) => state.product.products) || []);
  const [sortMethods, setSortMethod] = useState("default_sorting");

  const getProducts = async () => {
    try {
      const response = await fetch(
        "https://furniture-shop-75qd.onrender.com/products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (err) {
      console.error("Error fetching products:", err);
      return null; // Avoid setting products to undefined
    }
  };

  
    useEffect(() => {
      if (products.length == 0) {
        const fetchProducts = async () => {
          const data = await getProducts();
          if (data) {
            setProducts(data);
            dispatch(fetchProductsSuccess({ products: data }));
          }
        };
  
        fetchProducts();

      }
    }, []);


  const sortProducts = (method) => {
    setSortMethod(method);
    if (!products || products.length === 0) return;

    let sortedProducts;
    switch (method) {
      case "low_to_high":
        sortedProducts = [...products].sort((a, b) => {
          const firstVariationA = a.variations?.[0]?.sell_price || 0;
          const firstVariationB = b.variations?.[0]?.sell_price || 0;
          return firstVariationA - firstVariationB;
        });
        break;

      case "high_to_low":
        sortedProducts = [...products].sort((a, b) => {
          const firstVariationA = a.variations?.[0]?.sell_price || 0;
          const firstVariationB = b.variations?.[0]?.sell_price || 0;
          return firstVariationB - firstVariationA;
        });
        break;

      case "latest":
        sortedProducts = [...products].sort((a, b) => {
          const dateOfProductA = new Date(a.updatedAt);
          const dateOfProductB = new Date(b.updatedAt);
          return dateOfProductB - dateOfProductA;
        });
        break;

      default:
        return;
    }

    setProducts(sortedProducts);
  };

  return (
    <>
      <NavBar />
      <section className="products_section">
        <div className="wrap_products">
          <div className="inner_container">
            <div className="content">
              <Breadcrumbs />
              <h1 className="heading">Shop</h1>
              <div className="details">
                <select
                  name="sorting_method"
                  id="sorting_method"
                  value={sortMethods}
                  onChange={(e) => sortProducts(e.target.value)}
                >
                  <option value="default_sorting">Default sorting</option>
                  <option value="latest">Latest</option>
                  <option value="low_to_high">
                    Sort by price: low to high
                  </option>
                  <option value="high_to_low">
                    Sort by price: high to low
                  </option>
                </select>
              </div>
            </div>
            <div className="products">
              {products.map((product) => {
                // const firstVariation = product.variations[0]; // Use the first variation
                return (
                  <Product
                    key={product._id}
                    id = {product._id}
                    name={product.name}
                    variations={product.variations || []}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
