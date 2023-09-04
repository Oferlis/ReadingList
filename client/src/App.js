import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import { Home } from "./components/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import { UserContextProvider } from "./context/userContext";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const { user } = useContext(UserContext);
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
