import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import stores from "../data/stores"; // Import stores
import "./CartCheckout.css";

const Checkout = () => {
    const { cart, clearCart, currentStore } = useContext(CartContext);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Ensure we find the correct store
    const store = stores.find(store => store.id === Number(currentStore)); // Convert `currentStore` to a number
    const storeName = store ? store.name : null; // Ensure store name is valid

    const handleCheckout = () => {
        if (totalItems === 0) return;
        alert("Order Placed!");
        clearCart();
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout Summary</h2>

            {storeName && <p className="store-name">Store: {storeName}</p>}

            <div className="checkout-summary">
                <p><strong>Total Items:</strong> {totalItems}</p>
                <p><strong>Total Price:</strong> ₹{totalPrice}</p>
            </div>

            <button 
                onClick={handleCheckout} 
                className={`confirm-btn ${totalItems === 0 ? "disabled-btn" : ""}`}
                disabled={totalItems === 0}
            >
                Confirm Order
            </button>
        </div>
    );
};

export default Checkout;
