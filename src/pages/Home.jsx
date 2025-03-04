import StoreList from "../components/StoreList";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div className="home">
        <h1>Welcome to Kirana Kart</h1>
        <p>
          Order groceries from your trusted local kirana stores with quick
          delivery.
        </p>
      </div>

      {/* Store List Component */}
      <StoreList />

      {/* Navigation Links */}
      <div style={{ marginTop: "20px" }}>
        {/* <Link to="/cart">
          <button>Go to Cart</button>
        </Link> */}
      </div>
    </div>
  );
};

export default Home;
