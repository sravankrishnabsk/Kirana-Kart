import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [currentStore, setCurrentStore] = useState(null);

    const addToCart = (product, storeId) => {
        if (cart.length > 0 && currentStore !== storeId) {
            if (!window.confirm(`You have items from another store. Switching will clear your cart. Proceed?`)) {
                return;
            }
            setCart([]); // Clear cart when switching stores
        }
    
        setCurrentStore(storeId); // Update store only after confirmation
    
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };
    

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCart(prevCart =>
            prevCart.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)
        );
    };

    const clearCart = () => {
        setCart([]);
        setCurrentStore(null);
    };

    const updateStore = (storeId) => {
        setCurrentStore(storeId);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, currentStore, updateStore }}>
            {children}
        </CartContext.Provider>
    );
};
