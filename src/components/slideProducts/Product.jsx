import React from 'react'
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';


const Product = ({item}) => {
  const {addTocart , cartItems} = useContext(CartContext);
  console.log(cartItems);
  const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
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
        <span className='btn_addtocart' onClick={() => addTocart(item)} ><FaCartArrowDown /></span>
        <span ><FaRegHeart /></span>
        <span><FaShare /></span>
      </div>

    </div>
  )
}

export default Product