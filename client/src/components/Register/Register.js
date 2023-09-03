import { useState } from "react";
import "./Register.css";
import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = registerUser(data);
    if (response === true) {
      navigate("/");
      setData({});
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
          placeholder="Your password"
        />
        <label for="First Name">First Name</label>
        <input
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          type="firstName"
          id="firstName"
          placeholder="First Name"
        />

        <label for="Last Name">Last Name</label>
        <input
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          type="lastName"
          id="lastName"
          placeholder="Last Name"
        />
        <button type="submit">Register</button>
        <button>Already have an account? Log In</button>
      </form>
    </>
  );
};
