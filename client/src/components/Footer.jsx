import { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();

  const [emailData, setEmailData] = useState({
    to:"",
    subject: "Furniture Store",
    message: "Thankyou For Subscribing",
  });

  const handleChange = (e) => {
    setEmailData({...emailData, to: e.target.value });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/email/send-email", {
      method: "POST",
      body: JSON.stringify(emailData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const data = response;
    console.log("Data: ", data);
  }




  return (
    <footer>
      <div className="wrap_footer">
        <div className="inner_container">
          <img src={logo} alt="" className="footer_logo" />
          <div className="container">
            <div className="links">
              <h2>Links</h2>
              <ul>
                <li>Story</li>
                <li>Contact</li>
                <li>Track Order</li>
                <li>Help</li>
              </ul>
            </div>
            <div className="categories">
              <h2>Categories</h2>
              <ul>
                <li onClick={() => navigate(`/shop/category/Bedroom`)}>
                  Bedroom
                </li>
                <li onClick={() => navigate(`/shop/category/Decor`)}>
                  Decor 
                </li>
                <li onClick={() => navigate(`/shop/category/Living Room`)}>
                  Living Room 
                </li>
                <li onClick={() => navigate(`/shop/category/Office`)}>
                  Office
                </li>
              </ul>
            </div>
            <div className="subscribe_form">
              <h2>Subscribe</h2>
              <form method="get" onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={emailData.to}
                  onChange={handleChange}
                  placeholder="Your email address..."
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
