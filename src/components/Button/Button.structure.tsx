import { ButtonProps } from './Button.types'

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <button type='button' className='bg-gray-300 h-6  rounded-md p-6 border text-gray-700 border-gray-700  flex items-center justify-center transition-all ease-in hover:bg-gray-500'  {...rest} >
      {title}
    </button>
  )
}
