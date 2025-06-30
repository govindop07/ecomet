import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className='my-10 flex flex-col items-center justify-center gap-6'>

      <div className='flex justify-center flex-col items-center'>
        <h1 className='text-4xl font-semibold text-slate-500'>Latest
          <span className='text-blue-950'> Collection</span>
        </h1>
        <p className='my-2 text-slate-900'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, pariatur eius tempore nesciunt facilis at.</p>
      </div>

      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-[80vw] gap-4 gap-y-6'>
        {
          latestProducts.map((product) => (
            <ProductItem key={product._id} id={product._id} image={product.image} name={product.name} price={product.price} />
          ))
        }
      </div>

    </div>
  )
}

export default LatestCollection