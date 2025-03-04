import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import stores from "../data/stores"; // Import stores
import products from "../data/products"; // Import products
import "./CartCheckout.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, currentStore } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Ensure we find the correct store
  const store = stores.find(store => store.id === Number(currentStore));
  const storeName = store ? store.name : null;

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {storeName && <p className="store-name">Store: {storeName}</p>}

      {totalItems === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => {
            const storeProducts = products[currentStore] || [];
            const productDetails = storeProducts.find(prod => prod.id === item.id);
            const maxQuantity = productDetails ? productDetails.maxQuantity : 5; // Default max if not found

            return (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>

                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >-</button>

                    <span className="item-quantity">{item.quantity}</span>

                    <button 
                      onClick={() => {
                        if (item.quantity < maxQuantity) {
                          updateQuantity(item.id, item.quantity + 1);
                        } else {
                          alert(`Maximum limit reached: ${maxQuantity}`);
                        }
                      }}
                      disabled={item.quantity >= maxQuantity}
                    >+</button>
                  </div>
                </div>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="cart-summary">
        <p><strong>Total Items:</strong> {totalItems}</p>
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
      </div>

      {storeName && (
        <button className="buy-more-btn" onClick={() => navigate(`/store/${currentStore}`)}>
          Buy More from {storeName}
        </button>
      )}

      <Link 
        to={totalItems > 0 ? "/checkout" : "#"} 
        className={`checkout-btn ${totalItems === 0 ? "disabled" : ""}`}
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default Cart;
