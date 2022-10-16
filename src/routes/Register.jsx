
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register = () => {
  const [email, setEmail] = useState("kevin.pardov25@gmail.com");
  const [password, setPassword] = useState("123456");

  const navegate = useNavigate()

  const { registerUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enviando...", email, password);

    try {
      await registerUser(email, password);
      console.log('usuario creado')
      navegate('/')
    } catch (error) {
      console.log(error.code);
      
    }
  };

  return (
    <>
      <h1>Register</h1>
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

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
