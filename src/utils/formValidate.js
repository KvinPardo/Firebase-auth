import React from 'react'

const formValidate = (getValues) => {
    return {
        required: {
            value: true,
            message: "Campo Obligatorio",
        },
        patternEmail: {
            value: /[a-z0-9]+(\._a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato incorrecto",
        },
        minLength: {
            value: 6,
            message: "Mínimo 6 carácteres",
        },
        validateTrim: {
            trim: (v) => {
                if (!v.trim()) {
                    return "No seas Payaso, escribe algo";
                }
                return true;
            },
        },
        validateEquals(getValues) {
            return {
                equals: (v) =>
                    v === getValues("password") ||
                    "Las contraseñas son distintas",
            }
        },
    }
}

export default formValidate