import React from 'react'
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";
import { Link , useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { toast } from 'react-toastify';





const Product = ({item}) => {
  const navigate = useNavigate();
  const {cartItems , addToCart} = useContext(CartContext);
  
  const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);

   const handleAddToCart = () => {
          addToCart(item);
          toast.success(
              <div className='toast-wrapper'>
                  <img src={item.images[0]} alt="" className='toast-img' />
                  <div className="toast-content">
                      <strong>{item.title}</strong>
                      added to cart successfully!
                      <div>
                          <button className='btn' onClick={() => navigate('/cart')}>View Cart</button>
                      </div>
                  </div>
              </div>
              , {
                  duration: 3000,
                  position: "bottom-right",
  
              }
          )
  
  
      };
  return (
    <div className={`product ${isInCart ? "in-cart" : ""}`}>
     <Link to={`/product/${item.id}`}>
     <div className="status_cart">
      <FaCartArrowDown />
      <span>in cart</span>
     </div>
      <div className="img_product">
        <img src={item.thumbnail} alt={item.title} />
      </div>
      <p className='name_product'>{item.title}</p>
      
      <div className="stars">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStarHalfStroke />
      </div>
      <p className='price'>{item.price}</p>
     </Link>
      <div className="icons">
        <span className='btn_addtocart' onClick={handleAddToCart} ><FaCartArrowDown /></span>
        <span ><FaRegHeart /></span>
        <span><FaShare /></span>
      </div>

    </div>
  )
}

export default Product