import React from 'react'
import { assest } from '../assets/assest'


const Navbar = () => {
  return (
    <div className='w-full h-16 md:20 flex items-center justify-between'>
        {/* logo */}
      <div className='flex items-center gap-6'>
        <img src={assest.logo} alt="" className='w-[110px] h-[110px]'/>    
      </div>
      {/* Mobile */}
      <div>
        <a href="">Home</a>
        <a href="">Blog</a>
        <a href="">Feature</a>
        <a href="">Contact</a>

      </div>
      {/* Desktop */}
      <div>

      </div>


    </div>
  )
}

export default Navbar
