import { useState } from "react";
export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email + password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="youremail@gmail.com"
        />
        <label for="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="your_password"
        />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          id="name"
          placeholder="Ahsoka Tano"
        />
        <button type="submit">Register</button>
      </form>
      <button>Already have an account? Log In</button>
    </>
  );
};
