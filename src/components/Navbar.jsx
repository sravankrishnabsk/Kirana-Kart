import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FiUser } from "react-icons/fi";


const Navbar = () => {
  return (
    <nav className="navbar">
      <p className="logo">Kirana Kart</p>  

      <div className="nav-links">
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/cart" className="nav-item">Cart</NavLink>
        <NavLink to="/checkout" className="nav-item">Checkout</NavLink>
      </div>

      <button className="profile-btn"><span><FiUser /></span> Profile</button>
    </nav>
  );
};

export default Navbar;
