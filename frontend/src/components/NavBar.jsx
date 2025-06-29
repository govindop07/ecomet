import React, { useState } from 'react'
import {assets} from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {

  const [visible, setVisible] = useState(false);

  return (
    <div className='flex justify-between items-center lg:mx-40 md:mx-16 sm:mx-10 mx-5 my-5'>
      <div>
        <img src={assets.logo} alt="" className='h-8 md:h-12'/>
      </div>

      <div className='md:flex justify-between items-center gap-4 hidden'>
        <NavLink to='/' >
          <p>HOME</p>
          <hr className='w-3/4 mx-auto hidden'/>
        </NavLink>
        <NavLink to='/collection'>
          <p>COLLECTION</p>
          <hr className='w-3/4 mx-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
          <p>ABOUT</p>
          <hr className='w-3/4 mx-auto hidden'/>
        </NavLink>
        <NavLink to='/contact'>
          <p>CONTACT</p>
          <hr className='w-3/4 mx-auto hidden'/>
        </NavLink>
      </div>

      <div className='flex justify-center items-center gap-4 relative'>
          <div>
            <img src={assets.search_icon} alt="" className='h-6 cursor-pointer'/>
          </div>
          <div className='group relative'>
            <img src={assets.profile_icon} alt="" className='w-5 md:h-6 cursor-pointer'/>
            <div className='group-hover:block hidden absolute droupdown-menu right-0 pt-4'>
              <ul>
                <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Profile</li>
                <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Orders</li>
                <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Logout</li>
              </ul>
            </div>
          </div>

          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} alt="" className='w-5 min-w-5'/>
            <p className='absolute right-[-5px] bottom-[-5px] w-4 rounded-full text-white text-center leading-4 bg-black aspect-square text-[8px]'>10</p>
          </Link>
          <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-6 pt-1 cursor-pointer' />

      </div>

          {/* Sidebar for small screens */}
          <div className={`absolute top-0 left-0 right-0 bottom-0 overflow-hidden transition-all bg-white ${visible ? "w-full" : "w-0"}`}>
            <div className='flex flex-col text-gray-600 '>
              <div onClick={()=> setVisible(false)} className='flex items-center cursor-pointer gap-4 p-3'>
                <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180'/>
                <p>Back</p>
              </div>
              <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border' to='/' >HOME</NavLink>
              <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border border-t-0' to='/collection' >COLLECTION</NavLink>
              <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border border-t-0' to='/about' >ABOUT</NavLink>
              <NavLink onClick={()=> setVisible(false)} className='py-2 pl-6 border border-t-0' to='/contact' >CONTACT</NavLink>
            </div>
          </div>
    </div>
  )
}

export default NavBar