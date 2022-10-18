import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import { UserContext } from "./context/UserProvider";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              {/* Ruta Protegida */}
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
