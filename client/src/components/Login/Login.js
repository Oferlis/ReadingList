import { useState, useContext } from "react";
import "./Login.css";
import { loginUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(data);
    if (response) {
      setData({});
      setUser(response);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="email"
          id="email"
          placeholder="youremail@gmail.com"
        />
        <label for="password">Password</label>
        <input
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          type="password"
          id="password"
          placeholder="your_password"
        />
        <button type="submit">Log In</button>
        <button>Don't have an account? Register here</button>
      </form>
    </>
  );
};
