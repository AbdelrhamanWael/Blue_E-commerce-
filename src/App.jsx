import { useState } from 'react'
import TopHeader from './components/Header/TopHeader'
import BottomHeader from './components/Header/BottomHeader'
import Home from './page/Home/Home'
import { Routes, Route } from 'react-router-dom'
import ProductDetails from './page/productDetails/ProductDetails'
import Cart from './page/cart/Cart'
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <TopHeader />
        <BottomHeader />
      </header>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style:{
            background: "#e9e9e9",
          }
        }}
        
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>

    </>
  )
}

export default App
