import React from 'react'
import Product from './../../components/slideProducts/Product';
import { FaCartArrowDown, FaRegHeart, FaHeart, FaRegStarHalfStroke, FaShare, FaStar } from 'react-icons/fa6';
import { CartContext } from './../../context/CartContext';
import { FavoriteContext } from './../../context/FavoriteContext';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const ProductInfo = ({ product }) => {


    const { cartItems , addToCart } = useContext(CartContext);
    const { favoriteItems, toggleFavorite } = useContext(FavoriteContext);
    
    const isInCart = cartItems.some((cartItem) => cartItem.id === product.id);
    const isFavorite = favoriteItems.some((favItem) => favItem.id === product.id);
    
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(product);
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
        );
    };

    const handleToggleFavorite = () => {
        toggleFavorite(product);
        if (!isFavorite) {
            toast.success(
                <div className='toast-wrapper'>
                    <img src={product.images[0]} alt="" className='toast-img' />
                    <div className="toast-content">
                        <strong>{product.title}</strong>
                        added to favorites!
                    </div>
                </div>
                , { duration: 3000, position: "bottom-right" }
            );
        } else {
             toast.error(
                <div className='toast-wrapper'>
                    <img src={product.images[0]} alt="" className='toast-img' />
                    <div className="toast-content">
                        <strong>{product.title}</strong>
                        removed from favorites.
                    </div>
                </div>
                , { duration: 3000, position: "bottom-right" }
            );
        }
    };
    return (
        <div className="w-full md:w-[58%] pt-[10px] md:pt-0">
            <h2 className="mb-[30px] text-main text-2xl md:text-3xl font-bold">{product.title}</h2>
            <div className="my-[15px] flex gap-[5px] text-[#f8d941] text-[20px]">
                {Array.from({ length: Math.floor(product.rating) }, (_, index) => (
                    // <span key={index}>&#9733;</span>
                    <FaStar key={index} />
                ))}
                {product.rating % 1 !== 0 && <FaRegStarHalfStroke />}
            </div>
            <p className='text-[22px] my-[20px]'>$ {product.price && product.price.toFixed(2)}</p>

            <h5 className="font-medium mb-[20px] text-[16px]">Availability: <span>{product.availabilityStatus}</span></h5>
            <h5 className="font-medium mb-[20px] text-[16px]">Brand: <span>{product.brand}</span></h5>
            <p className='leading-relaxed'>{product.description}</p>
            <h5 className="font-medium mb-[20px] text-[16px] text-red-500 mt-[20px]"><span>Hurry Up! Only {product.stock} products left in stock .</span> </h5>
            <button className={`text-[16px] rounded-[2px] py-[12px] px-[15px] border border-main transition-all duration-300 flex items-center gap-[10px] ${isInCart ? "bg-transparent text-main pointer-events-none" : "bg-main text-white hover:bg-transparent hover:text-main"}`} onClick={handleAddToCart}>
                <FaCartArrowDown className="text-[20px]" /> {isInCart ? "In Cart" : "Add to Cart"}
            </button>

            <div className="flex gap-[10px] transition-all duration-300 my-[20px]">
                <span className="w-[40px] h-[40px] bg-bg flex justify-center items-center rounded-full cursor-pointer transition-all duration-300 hover:bg-main group" onClick={handleToggleFavorite}>{isFavorite ? <FaHeart color="red" /> : <FaRegHeart className="group-hover:fill-white transition-colors" />}</span>
                <span className="w-[40px] h-[40px] bg-bg flex justify-center items-center rounded-full cursor-pointer transition-all duration-300 hover:bg-main group"><FaShare className="group-hover:fill-white transition-colors" /></span>
            </div>




        </div>
    )
}

export default ProductInfo