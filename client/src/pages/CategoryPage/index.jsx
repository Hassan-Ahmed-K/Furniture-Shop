import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../../components/Product";
import Breadcrumbs from "../../components/Breadcrumb";
import NavBar from "../../components/nav";



const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState(null); 

  console.log("useParams = ", useParams());

  useEffect(() => {
    const getCategoryProduct = async () => {
      try {
        const response = await fetch(
          `http://13.127.166.185:443/products/category/${categoryName}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const result = await response.json();
        setProducts(result); 
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    getCategoryProduct();
  }, [categoryName]);

  return (
    <>
      <NavBar />

      <section className="products_section">
        <div className="wrap_products">
          <div className="inner_container">
            <div className="content">
              <Breadcrumbs />
              <h1 className="heading">{categoryName}</h1>
            </div>
            {products &&(

              <div className="products">
                {products.map((product) => {
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
    </>
  );
};

export default CategoryPage;
