import React from 'react'
import Product from './../../components/slideProducts/Product';
import { FaCartArrowDown, FaRegHeart, FaRegStarHalfStroke, FaShare, FaStar } from 'react-icons/fa6';
import { CartContext } from './../../components/context/CartContext';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './productDetails.css'

const ProductInfo = ({ product }) => {


    const { cartItems , addTocart } = useContext(CartContext);
    const isInCart = cartItems.some((cartItem) => cartItem.id === product.id);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addTocart(product);
        toast.success(
            <div className='toast-wrapper'>
                <img src={product.images[0]} alt="" className='toast-img' />
                <div className="toast-content">
                    <strong>{product.title}</strong>
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
        <div className="details_item">
            <h2>{product.title}</h2>
            <div className="stars">
                {Array.from({ length: Math.floor(product.rating) }, (_, index) => (
                    // <span key={index}>&#9733;</span>
                    <FaStar key={index} />
                ))}
                {product.rating % 1 !== 0 && <FaRegStarHalfStroke />}
            </div>
            <p className='price'>$ {product.price && product.price.toFixed(2)}</p>

            <h5>Availability: <span>{product.availabilityStatus}</span></h5>
            <h5>Brand: <span>{product.brand}</span></h5>
            <p className='desc'>{product.description}</p>
            <h5><span>Hurry Up! Only {product.stock} products left in stock .</span> </h5>
            <button className={`btn ${isInCart ? "in-cart" : ""}`} onClick={handleAddToCart}>
                <FaCartArrowDown /> {isInCart ? "In Cart" : "Add to Cart"}
            </button>

            <div className="icons">
                <span><FaRegHeart /></span>
                <span><FaShare /></span>
            </div>




        </div>
    )
}

export default ProductInfo