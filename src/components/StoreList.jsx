import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import stores from "../data/stores"; // Import stores
import "./Store.css";

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); // Distance in km
};

const StoreList = () => {
  const navigate = useNavigate();
  const { clearCart, currentStore, updateStore, cart } = useContext(CartContext);
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleStoreChange = (storeId) => {
    const currentStoreName = stores.find(store => store.id === currentStore)?.name || "Unknown Store";

    if (currentStore === storeId) {
      navigate(`/store/${storeId}`);
      return;
    }

    if (cart.length > 0 && currentStore !== storeId) {
      if (!window.confirm(`You have items from ${currentStoreName}. Switching stores will clear your cart. Proceed?`)) {
        return;
      }
      clearCart();
    }

    updateStore(storeId);
    navigate(`/store/${storeId}`);
  };

  return (
    <div className="store-list">
      <h2>Local Kirana Stores</h2>
      <div className="store-cards">
        {stores.map((store) => (
          <div key={store.id} className="store-card">
            <div className="store-content">
              <p className="store-name">{store.name}</p>
              {userLocation.lat !== null &&
                userLocation.lon !== null &&
                store.lat &&
                store.long && (
                  <p className="store-distance">
                    {getDistance(userLocation.lat, userLocation.lon, store.lat, store.long)} km Away
                  </p>
              )}
              <p className="store-body">{store.location}</p>
              <button className="view-prod" onClick={() => handleStoreChange(store.id)}>
                Quick View
              </button>
            </div>
            <div>
              <img className="store-image" src={store.imageURL ? store.imageURL : "/store.jpg"} alt={store.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
