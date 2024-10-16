import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./Containers/Auth/Login";
import Signup from "./Containers/Auth/Signup";
import Home from "./Pages/Home";
import Header from "./Containers/Header";

function App() {
  const [userData, setUserData] = useState(null);

  const handleLogin = (role) => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    setUserData(storedUserData); 
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const location = useLocation();
  const showHeader =
    userData &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup";

  return (
    <div className="App">
      {showHeader && <Header userData={userData} handleLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            userData ? (
              <Home handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
