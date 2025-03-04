import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar"; // Import Navbar
import Home from "./pages/Home";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar /> {/* Navbar appears on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/:id" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
