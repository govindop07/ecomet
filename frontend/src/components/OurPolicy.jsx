import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row text-center justify-between max-w-[90vw] md:max-w-[70vw] mx-auto gap-10 my-20'>

      <div className='flex flex-col items-center justify-center'>
        <img src={assets.exchange_icon} className='h-12 md:h-14 mb-4'/>
        <p className='font-semibold text-sm'>Easy Exchange Policy</p>
        <p className='font-semibold text-slate-500 text-sm'>We offer hassle free exchange policy</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <img src={assets.quality_icon} className='h-12 md:h-14 mb-4'/>
        <p className='font-semibold text-sm'>7 Days Return Policy</p>
        <p className='font-semibold text-slate-500 text-sm'>We provide 7 days free return policy</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <img src={assets.support_img} className='h-12 md:h-14 mb-4'/>
        <p className='font-semibold text-sm'>Best Customer Support</p>
        <p className='font-semibold text-slate-500 text-sm'>We provide 24/7 customer support</p>
      </div>

    </div>
  )
}

export default OurPolicy