import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

  const {cartItems, products, currency, updateQuantity} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    const tempData = [];
    for(const items in cartItems) {
      for(const item in cartItems[items]) {
        if(cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14 max-w-[90%] mx-auto text-2xl mb-3">
      {/* header */}
      <div className='flex justify-between items-center text-center mb-5'>
        <h1 className='text-2xl gap-2 sm:text-3xl font-semibold text-slate-500'>YOUR
          <span className='text-blue-950'> CART</span>
        </h1>
      </div>

<div>
  {
    cartData.map((item, index) => {
      const productData = products.find((product) => product._id === item._id);
      
      if (!productData) {
        return null; 
      }

      return (
        <div key={index} className="py-4 border-t border-b border-b-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fe_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
          <div className="flex items-start gap-6">
            <img className="w-16 sm:w-20" src={productData.image[0]} alt="" />
            <div>
              <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
              <div className="flex items-center gap-5 mt-2">
                <p className="text-lg">{currency}{productData.price}</p>
                <p className="text-sm px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
              </div>
            </div>
          </div>
          
          <input 
            onChange={(e) => {
              if (e.target.value !== '' && Number(e.target.value) >= 1) {
                updateQuantity(item._id, item.size, Number(e.target.value));
              }
            }}
            className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-sm" 
            type="number" 
            min={1} 
            value={item.quantity}
          />
          
          <img onClick={()=>updateQuantity(item._id, item.size, 0)} className="w-4 mr-4 cursor-pointer" src={assets.bin_icon} alt="" />
        </div>
      )
    })
  }
</div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={() => navigate('/place-order')} className="cursor-pointer bg-black text-white text-sm my-8 px-8 py-3">Proceed to checkout</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CartPage