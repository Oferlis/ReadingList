import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { logoutUser } from "../../api/api";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return (
      <ul className="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="blank"></li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
  }
  return (
    <ul className="navbar">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li className="blank"></li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link onClick={handleLogout}>Logout</Link>
      </li>
    </ul>
  );
};

export default Navbar;
