import {assets} from '../assets/assets.js'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between h-20 px-[4%]'>
      <img className='w-34' src={assets.logo} alt="" />
      <button onClick={() => setToken('')} className='bg-gray-600 cursor-pointer text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar