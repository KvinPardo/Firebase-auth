import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
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
      setError("firebase", {
        message: errorresFirebase(error.code),
      });
    }
  };

  return (
    <>
      <h1>Register</h1>
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

        

        <FormInput
          type="password"
          placeholder="Ingrese Contraseña"
          {...register("repassword", {
            minLength,
            validate: validateEquals(getValues),
          })}
        >
          <FormError error={errors.repassword} />
        </FormInput>

        
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
