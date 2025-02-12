import logo from "../assets/logo.png";

const Footer = () => {
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
                <li>
                  Bedroom <span>(6)</span>
                </li>
                <li>
                  Decor <span>(6)</span>
                </li>
                <li>
                  Living Room <span>(6)</span>
                </li>
                <li>
                  Office <span>(6)</span>
                </li>
              </ul>
            </div>
            <div className="subscribe_form">
              <h2>Subscribe</h2>
              <form action="" method="get">
                <input
                  type="email"
                  value=""
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
