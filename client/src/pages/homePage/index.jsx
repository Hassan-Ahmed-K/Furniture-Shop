import { FaShippingFast, FaLock, FaUndo,FaTruck } from "react-icons/fa";
import NavBar from "../../components/nav";
import SliderComponent from "../../components/Slider";
import Product from "../../components/Product";
import Footer from "../../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


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
import product1 from "../../assets/product.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import product4 from "../../assets/product4.jpg";
import product5 from "../../assets/product5.jpg";
import star from "../../assets/star.png"


const HomePage = () => {
  console.log("localstorage: ",JSON.parse(localStorage.getItem("USER")));
    
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const imageArray = [brand1, brand2, brand3, brand4];
  const categories = [
    { img: cat1, name: "Bedroom" },
    { img: cat2, name: "Decor" },
    { img: cat3, name: "Living Room" },
    { img: cat4, name: "Office" },
  ];



  // const products = [
  //   {
  //     img: product1,
  //     name: "Product 1",
  //     original_price: "105.00",
  //     current_price: "85.00",
  //     colors: ["#000000", "#8f6453", "#dabca2"],
  //   },
  //   {
  //     img: product2,
  //     name: "Product 2",
  //     original_price: "120.00",
  //     current_price: "95.00",
  //     colors: ["#000000", "#8f6453", "#dabca2"],
  //   },
  //   {
  //     img: product3,
  //     name: "Product 3",
  //     original_price: "150.00",
  //     current_price: "125.00",
  //     colors: ["#000000", "#8f6453", "#dabca2"],
  //   },
  //   {
  //     img: product4,
  //     name: "Product 4",
  //     original_price: "99.00",
  //     current_price: "79.00",
  //     colors: ["#000000", "#8f6453", "#dabca2"],
  //   },
  //   {
  //     img: product5,
  //     name: "Product 5",
  //     original_price: "200.00",
  //     current_price: "180.00",
  //     colors: ["#000000", "#8f6453", "#dabca2"],
  //   },
  // ];

  // const name = products[0].name;
  // const img = products[0].img;
  // const original_price = products[0].original_price;
  // const current_price = products[0].current_price;
  // const colors = products[0].colors;

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
      const fetchProducts = async () => {
        const data = await getProducts();
        if (data) dispatch(fetchProductsSuccess({ products: data }));
        // console.log("products = ", data);
      };
  
      fetchProducts();
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
              <button className="btn">SHOP NOW</button>
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
                <div className="category" key={category.name}>
                  <img src={category.img} alt="" />
                  <div className="detail">
                    <h3 className="category_name">{category.name}</h3>
                    <p className="product_count">6 Products</p>
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
                  <Product
                    key={products[0]._id}
                    id={products[0]._id}
                    name={products[0].name}
                    variations={products[0].variations || []}
                  />
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


