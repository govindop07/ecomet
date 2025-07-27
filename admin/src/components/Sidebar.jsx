import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'
import '../index.css'
import { useState } from 'react'

const Sidebar = () => {

  const [activeBar, setActiveBar] = useState("add");

  return (
    <div className='w-[18%] min-h-screen border-r-1'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink onClick={() => setActiveBar("add")} className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${activeBar === 'add'? "bg-[#ffebf5]" : ""}`} to={'/'}>
          <img className='w-5 h-5 ' src={assets.add_icon} alt="" />
          <p className='hidden md:block'>Add items</p>
        </NavLink>
        <NavLink onClick={() => setActiveBar("list")} className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${activeBar === 'list'? "bg-[#ffebf5]" : ""}`} to={'/list'}>
          <img className='w-5 h-5 ' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>List items</p>
        </NavLink>
        <NavLink onClick={() => setActiveBar("order")} className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${activeBar === 'order'? "bg-[#ffebf5]" : ""}`} to={'/orders'}>
          <img className='w-5 h-5 ' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar