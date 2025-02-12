import { BrowserRouter,Routes,Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import ShopPage from "./pages/shopPage";
import ProductPage from "./pages/productPage";
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/checkoutPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
      {/* <NavBar /> */}
    </div>
  );
}

export default App;
