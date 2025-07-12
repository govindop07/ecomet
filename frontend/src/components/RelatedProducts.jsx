import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}) => {

  const {products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if(products.length > 0) {
      let filteredProducts = products;
      filteredProducts = filteredProducts.filter((item) => (
        item.category === category && item.subCategory === subCategory
      ))

      filteredProducts = filteredProducts.slice(0, 5);

      setRelated(filteredProducts);
    }
  }, [products])

  return (
    <div className='my-18'>
      <div className='text-center text-3xl py-2 mb-10'>
          <h1 className='text-3xl gap-2 sm:text-4xl font-semibold text-slate-500'>RELATED
            <span className='text-blue-950'> PRODUCTS</span>
          </h1>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          related.map((item) => (
            <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default RelatedProducts