import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

import { UserContext } from "../context/UserProvider";
import errorresFirebase from "../utils/errorresFirebase";
import formValidate from "../utils/formValidate";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    // console.log(email, password);
    try {
      await loginUser(email, password);
      // console.log("usuario creado");
      navegate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: errorresFirebase(error.code),
      });
    }
  };

  return (
    <>
      <h1>Login</h1>
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese Contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
        >
          <FormError error={errors.password} />
        </FormInput>

        <button type="submit">Iniciar Sesión</button>
      </form>
    </>
  );
};

export default Login;
