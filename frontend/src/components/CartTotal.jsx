import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"

const CartTotal = () => {
  const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);

  return (
    <div className="w-full mx-auto">
      <div className="text-2xl">
        <div className='flex justify-between items-center text-center mb-5'>
          <h1 className='text-2xl gap-2 sm:text-3xl font-semibold text-slate-500'>CART
            <span className='text-blue-950'> TOTALS</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount()+delivery_fee}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal