import React from 'react'
import { Link } from 'react-router-dom'
import CategoryPage from '../components/CategoryPage'

const HomePage = () => {
  return (
    <div className='mt-20 flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Link to="/"> Home </Link>
      <span>*</span>
      <span className='text-blue-800'> Blogs and Articles </span>
      </div>

    {/* Introduction */}

    <div className='flex items-center justify-between'>
      <div>
        <h1 className= ' text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
        <p className='mt-8 text-md md:text-xl'>Lorem ipsum dolor sit amet consectetur quis reprehenderit sunt tempora ad quasi iste esse consequuntur!</p>
      </div>
    </div>

    {/* CategoryPage */}
    <CategoryPage/>


      
    </div>
  )
}

export default HomePage
