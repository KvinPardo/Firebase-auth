import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Login = () => {

  const [email, setEmail] = useState("kevin.pardov25@gmail.com");
  const [password, setPassword] = useState("123456");

  const { loginUser } = useContext(UserContext);
  const navegate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enviando...", email, password);

    try {
      await loginUser(email, password);
      console.log('usuario logueado')
      navegate("/")
    } catch (error) {
      console.log(error.code);     
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Ingrese Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Ingrese Password"
        />

        <button type="submit">Iniciar Sesión</button>
      </form>
      
    </>
  );
};

export default Login;
