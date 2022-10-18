import React from 'react'

const FormError = ({error}) => {
  return (
    <>
        {error && <p className='text-red-500'>{error.message}</p>}
    </>
  )
}

export default FormError