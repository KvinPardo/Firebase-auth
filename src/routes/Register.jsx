import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register = () => {
  const navegate = useNavigate();

  // Formulario
  const { registerUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async({email, password}) => {
    console.log(email, password)
    try {
      await registerUser(email,password);
      console.log('usuario creado')
      navegate('/')
    } catch (error) {
      console.log(error.code);
      switch(error.code) {
        case "auth/email-already-in-use" :
          setError("email", {
            message: "Usuario ya registrado"
          })
          break;
        case "auth/invalid-email":
          setError("email", {
            message: "Formato email no válido"
          })
          break;
          default:
            console.log('Error en el Servidor')
          
      }

    }
  };


  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo obligatorio",
            },
            pattern: {
              value:
                /[a-z0-9]+(\._a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message: "Formato incorrecto",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Ingrese Password"
          {...register("password", {
            setValueAs: (v) => v.trim(),
            minLength: {
              value: 6,
              message: "Mínimo 6 carácteres",
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) return "No seas wn"
                true
              },
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Ingrese Password"
          {...register("repassword", {
            setValueAs: (v) => v.trim(),
            validate: {
              equals: (v) =>
                v === getValues("password") || "Las contraseñas son distintas",
              // message: 'Las contraseñas son distintas'
            },
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
