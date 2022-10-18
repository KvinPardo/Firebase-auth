import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";

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
      const { code, message } = errorresFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <Title text="Inicio de Sesión" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Ingresa tu Correo"
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          label="Ingrese su Contraseña"
          type="password"
          placeholder="Ingrese Contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <Button text="Iniciar Sesión" type="submit"/>
      </form>
    </>
  );
};

export default Login;
