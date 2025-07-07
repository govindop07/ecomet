import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex max-w-[80vw] justify-around gap-12 flex-col md:flex-row mx-auto mt-28'>
        
        <div className='flex flex-col gap-6 max-w-[500px]'>
          <img src={assets.logo} className='w-40' />
          <p className='text-gray-500 sm:text-sm lg:text-'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos neque ratione eum nihil magni, exercitationem officia in rerum magnam accusamus cum possimus error libero vero nisi voluptatem illo.</p>
        </div>

      <div className='flex flex-col gap-4 mt-2'>
        <h4 className='font-semibold text-xl'>Company</h4>
        <ul className='text-gray-500 text-sm flex flex-col gap-1'>
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
      </div>

      <div className='flex flex-col gap-4 mt-2'>
        <h4 className='font-semibold text-xl'>Get In Touch</h4>
        <ul className='text-gray-500 text-sm flex flex-col gap-1'>
          <li>+1-212-456-7890</li>
          <li>contact@ecomet.com</li>
        </ul>
      </div>


      </div>

      <div className='text-center mt-4 mb-2 max-w-[80vw] mx-auto '>
        <hr className='text-slate-400 text-sm'/>
        <p className='text-sm'>Copyright 2025@ecomet. All rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer