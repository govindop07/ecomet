import React from 'react'
import LatestCollection from '../components/LatestCollection'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'

const HomePage = () => {
  return (
    <div>
      <LatestCollection />
      <BestSellers />
      <OurPolicy />
    </div>
  )
}

export default HomePage