
import TopHeader from './components/Header/TopHeader'
import BottomHeader from './components/Header/BottomHeader'
import Home from './page/Home/Home'
import { Routes, Route } from 'react-router-dom'
import ProductDetails from './page/productDetails/ProductDetails'
import Cart from './page/cart/Cart'
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import ScrollToTop from './components/ScrollToTop'
import { AnimatePresence } from 'framer-motion'
import CategoryPage from './page/CategoryPage/CategoryPage'


function App() {

  return (
    <>
      <header>
        <TopHeader />
        <BottomHeader />
      </header>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#e9e9e9",
          }
        }}

      />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </AnimatePresence>



    </>
  )
}

export default App
