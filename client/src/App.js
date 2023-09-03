import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import { Home } from "./components/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import { UserContextProvider } from "./context/userContext";

function App() {
  const user = localStorage.getItem("token");

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        {user && <Route path="/" element={<Home />} />}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
