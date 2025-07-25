import React from 'react'

interface ButtonProps{
  className?: string,
  text: string,
  href?: string,
}
const Button = ({ className, text, href}: ButtonProps) => {
  return (
    <a href={href} className={`mt-6 w-[200px] h-[50px] py-2 px-4 text-white text-center items-center rounded-md  ${className}`} >
      {text}
    </a>
  )
}

export default Button