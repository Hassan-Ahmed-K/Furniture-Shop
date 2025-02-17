import { FaShippingFast, FaLock, FaUndo,FaTruck } from "react-icons/fa";
import NavBar from "../../components/nav";
import SliderComponent from "../../components/Slider";
import Product from "../../components/Product";
import Footer from "../../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useState,useEffect } from "react";


import { fetchProductsSuccess } from "../../redux/reducers/productReducer.js"


import banner_bg from "../../assets/banner-bg.jpg";
import promotion_img from "../../assets/bg-01.jpg";
import brand1 from "../../assets/logo-001.png";
import brand2 from "../../assets/logo-002.png";
import brand3 from "../../assets/logo-004.png";
import brand4 from "../../assets/logo-008.png";
import cat1 from "../../assets/cat1.jpg";
import cat2 from "../../assets/cat2.jpg";
import cat3 from "../../assets/cat3.jpg";
import cat4 from "../../assets/cat4.jpg";
import star from "../../assets/star.png"
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(useSelector((state) => state.product.products) || []); 
  const dispatch = useDispatch();
  const imageArray = [brand1, brand2, brand3, brand4];
  const categories = [
    { img: cat1, name: "Bedroom" },
    { img: cat2, name: "Decor" },
    { img: cat3, name: "Living Room" },
    { img: cat4, name: "Office" },
  ];

  const reviews = [
    {
      star: 5,
      text: "Amazing product! Highly recommend to everyone.",
      username: "Mark Justin",
    },
    {
      star: 4,
      text: "Good quality, but shipping took longer than expected.",
      username: "Sarah Thompson",
    },
    {
      star: 3,
      text: "Decent, but could be improved in terms of durability.",
      username: "David Lee",
    },
  ];

  console.log("Products =", products);

    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return await response.json();
      } catch (err) {
        console.error("Error fetching products:", err);
        return null;
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


  return (
    <>
      <NavBar />
      <section
        className="banner"
        style={{ backgroundImage: `url(${banner_bg})` }}
      >
        <div className="wrap_banner">
          <div className="inner_container">
            <div className="context">
              <p className="subtitle">Black Friday in July</p>
              <h2 className="heading">Up to 50% off</h2>
              <p className="title">Hundreds of styles available</p>
              <button className="btn" onClick={() => navigate("/shop")}>
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="brands">
        <div className="wrap_brands">
          <SliderComponent images={imageArray} />
        </div>
      </section>

      <section className="category_section">
        <div className="wrap_category">
          <div className="inner_container">
            <p className="subtitle">Shop by category</p>
            <h2 className="heading">Shop by category</h2>
            <span className="line"></span>
            <div className="categories">
              {categories.map((category) => (
                <div
                  className="category"
                  onClick={() => navigate(`/shop/category/${category.name}`)}
                  key={category.name}
                >
                  <img src={category.img} alt="" />
                  <div className="detail">
                    <h3 className="category_name">{category.name}</h3>
                    {/* <p className="product_count">6 Products</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="featured_product">
        <div className="wrap_feature_product">
          <div className="inner_container">
            <p className="subtitle">Shop by category</p>
            <h2 className="heading">Featured Products</h2>
            <span className="line"></span>
            {products && (
              <div className="products">
                {products.slice(0, 6).map((product) => {
                  // const firstVariation = product.variations[0]; // Use the first variation
                  return (
                    <Product
                      key={product._id}
                      id={product._id}
                      name={product.name}
                      variations={product.variations || []}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="promotion">
        <div className="wrap_promotion">
          <div className="inner_container">
            <div
              className="left_col"
              style={{ backgroundImage: `url(${promotion_img})` }}
            >
              <p className="subtitle">New arrival</p>
              <h3>Brand new, modern lamps collection</h3>
            </div>
            <div className="right_col">
              {products && (
                <div className="products">
                  {products.length > 0 && (
                    <Product
                      key={products[0]._id}
                      id={products[0]._id}
                      name={products[0].name}
                      variations={products[0].variations || []}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="reviews_section">
        <div className="wrap_reviews">
          <div className="inner_container">
            {reviews.map((review, reviewIndex) => (
              <div key={`${reviewIndex}-${review.username}`} className="review">
                <div className="star">
                  {Array.from({ length: review.star }).map((_, index) => (
                    <img key={index} src={star} alt="star" />
                  ))}
                </div>
                <p className="text">{review.text}</p>
                <p className="username">{review.username}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="choose_us">
        <div className="wrap_choose_us">
          <div className="inner_container">
            <p className="subtitle">Best Products</p>
            <h2 className="heading">Why choose us</h2>
            <span className="line"></span>

            <div className="reasons">
              <div className="reason">
                <FaShippingFast className="icon" />
                <h3 className="name">Fast Delivery</h3>
                <p className="text">
                  Lorem ipsum dolor sit amet consectetur, ea incidunt aliquam
                  iste?
                </p>
              </div>

              <div className="reason">
                <FaTruck className="icon" />
                <h3 className="name">Free Shipping</h3>
                <p className="text">
                  Lorem ipsum dolor sit amet consectetur, ea incidunt aliquam
                  iste?
                </p>
              </div>

              <div className="reason">
                <FaLock className="icon" />
                <h3 className="name">Secure Checkout</h3>
                <p className="text">
                  Lorem ipsum dolor sit amet consectetur, ea incidunt aliquam
                  iste?
                </p>
              </div>

              <div className="reason">
                <FaUndo className="icon" />
                <h3 className="name">Easy Return</h3>
                <p className="text">
                  Lorem ipsum dolor sit amet consectetur, ea incidunt aliquam
                  iste?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;


