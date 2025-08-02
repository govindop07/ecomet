import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import CollectionPage from './Pages/CollectionPage'
import SearchBar from './components/SearchBar'
import ProductPage from './Pages/ProductPage'
import { ToastContainer, toast } from 'react-toastify';
import CartPage from './Pages/CartPage'
import PlaceOrderPage from './Pages/PlaceOrderPage'
import OrdersPage from './Pages/OrdersPage'
import LoginPage from './Pages/LoginPage'
import VerifyPage from './Pages/VerifyPage'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'

const App = () => {
  return (
    <div className='font-serif'>

      <ToastContainer />
      <NavBar />
      <SearchBar />
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/collection' element={<CollectionPage />} />
        <Route path='/product/:productId' element={<ProductPage />} />
        <Route path='/place-order' element={<PlaceOrderPage />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verify' element={<VerifyPage />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App