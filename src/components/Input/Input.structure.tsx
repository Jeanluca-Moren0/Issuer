import React, { InputHTMLAttributes } from 'react'

import { InputProps } from './Input.types'

export function Input({ label, ...rest }: InputProps,) {
  return (
    <div className='flex flex-col gap-2' >
      <label className='text-md font-thin  text-gray-700'>{label}:</label>
      <input type="text" className='w-full h-12  border border-gray-700 bg-gray-300 text-gray-700 rounded-md text-md  p-4 capitalize'  {...rest} />
    </div>
  )
}
