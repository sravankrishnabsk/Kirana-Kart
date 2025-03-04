import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useParams, Link } from "react-router-dom";
import products from "../data/products"; // Import products
import "./ProductList.css";

const ProductList = () => {
  const { id: storeId } = useParams();
  const storeProducts = products[storeId] || [];
  const { addToCart, cart, updateQuantity, removeFromCart } =
    useContext(CartContext);

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="product-cards">
        {storeProducts.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          return (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>({product.quantity})</p>
              <p>₹{product.price}</p>

              {cartItem ? (
                <div className="quantity-controls">
                  <button
                    onClick={() => {
                      if (cartItem.quantity === 1) {
                        removeFromCart(product.id); // Remove from cart if quantity is 1
                      } else {
                        updateQuantity(product.id, cartItem.quantity - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button
                    onClick={() => {
                      if (cartItem.quantity < product.maxQuantity) {
                        updateQuantity(product.id, cartItem.quantity + 1);
                      } else {
                        alert(`Maximum limit reached: ${product.maxQuantity}`);
                      }
                    }}
                    disabled={cartItem.quantity >= product.maxQuantity}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button onClick={() => addToCart(product, storeId)}>
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Go to Cart button */}
      <div className="cart-navigation">
        <Link to="/cart" className="gotocart">
          Go to Cart 🛒
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
