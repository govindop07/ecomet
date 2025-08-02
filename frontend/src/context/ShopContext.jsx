import React, { useEffect, useState, useTransition } from 'react'
import { createContext } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '₹';
  const delivery_fee = 40;
  const backend_url = import.meta.env.VITE_BACKEND_URL
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');

  const addToCart = async (itemId, itemSize) => {
    if(!itemSize) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if(cartData[itemId]) {
      if(cartData[itemId][itemSize]) {
        cartData[itemId][itemSize] += 1;
        setCartCount(cartCount+1);
      } else {
        cartData[itemId][itemSize] = 1;
        setCartCount(cartCount+1);
      }
    }
    else {
      cartData[itemId] = {};
      cartData[itemId][itemSize] = 1;
      setCartCount(cartCount+1);
    }
    setCartItems(cartData);
    setCartCount(cartCount+1);

    if(token) {
      try {
        let size = itemSize
        const response = await axios.post(backend_url+'/api/cart/add', {itemId, size}, {headers: {token}})
        console.log(response)

      } catch (error) {
        console.log(error)
        toast.error(error.message);
      }
    }
  }

  const getProductData = async () => {
    try {
      const response = await axios.get(backend_url+'/api/product/list')
      if(response.data.success) setProducts(response.data.products);
      else toast.error(response.data.message);

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    const oldQuantity = cartData[itemId]?.[size] || 0;
    cartData[itemId][size] = quantity;

    // If the new quantity is 0, remove the size entry
    if (quantity === 0) {
      delete cartData[itemId][size];
      // If there are no more sizes for this item, remove the item entry
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }
    const quantityDifference = quantity - oldQuantity;
    setCartCount(prevCount => prevCount + quantityDifference);

    setCartItems(cartData);
    if(token) {
      try {
        await axios.post(backend_url+'/api/cart/update', {itemId, size, quantity}, {headers:{token}})

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);

      if (itemInfo) {
        // Loop through each size for that specific product
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];
          // If there's a valid quantity for this size
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        }
      }
    }
    return totalAmount;
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backend_url+'/api/cart/get', {}, {headers: {token}})
      if(response.data.success) {
        const cartData = response.data.cartData;
        setCartItems(cartData);

        let cartSize = 0;
        for(const item in cartData) {
          for(const size in cartData[item]) {
            const quantity = cartData[item][size];
            cartSize += quantity;
          }
        }
        setCartCount(cartSize);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getProductData();
  }, [])

  useEffect(()=> {
    if(!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartCount,
    cartItems,
    setCartItems,
    updateQuantity,
    getCartAmount,
    token,
    setToken,
    backend_url
  }

  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider