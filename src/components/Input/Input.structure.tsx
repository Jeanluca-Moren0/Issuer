import React, { InputHTMLAttributes } from 'react'

import { InputProps } from './Input.types'

export function Input({ label, ...rest }: InputProps,) {
  return (
    <div className='flex flex-col gap-2' >
      <label className='text-md font-thin  text-white'>{label}:</label>
      <input type="text" className='w-full h-12  border border-white bg-baroqueGreen text-white rounded-md text-md  p-4 capitalize'  {...rest} />
    </div>
  )
}
