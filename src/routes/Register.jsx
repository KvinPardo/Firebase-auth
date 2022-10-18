import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import { UserContext } from "../context/UserProvider";
import errorresFirebase from "../utils/errorresFirebase";
import formValidate from "../utils/formValidate";

const Register = () => {
  const navegate = useNavigate();

  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,

  } = useForm();

  const onSubmit = async ({ email, password }) => {
    // console.log(email, password);
    try {
      await registerUser(email, password);
      // console.log("usuario creado");
      navegate("/");
    } catch (error) {
      console.log(error.code);
      const {code, message} = errorresFirebase(error.code)
      setError(code, {message});
    }
  };

  return (
    <>
      <Title text="Registro de Usuarios"/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu Correo"
          error={errors.email}
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
          label="Ingrese Contraseña"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        

        <FormInput
          type="password"
          placeholder="Vuelva a ingresar su contraseña"
          {...register("repassword", {
            minLength,
            validate: validateEquals(getValues("password")),
          })}
          label="Repita Contraseña"
          error={errors.repassword}
          
        >
          <FormError error={errors.repassword} />
        </FormInput>

        
        <Button text="Registrarme" type="submit"/>
      </form>
    </>
  );
};

export default Register;
