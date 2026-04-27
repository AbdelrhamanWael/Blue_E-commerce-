import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/image.png'
import { FaRegHeart, FaEllipsisV } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import './header.css'
import { CartContext } from '../context/cartContext';
import { FavoriteContext } from '../context/FavoriteContext';
import SearchBox from './SearchBox';

const TopHeader = () => {
    const {cartItems} = useContext(CartContext);
    const {favoriteItems} = useContext(FavoriteContext);
    const [isIconsOpen, setIsIconsOpen] = useState(false);

  return (
    <div className='top_header'>
        <div className='container'>
            <Link className='logo' to="/">
                <img src={logo} alt="logo" />
            </Link>

            <SearchBox />

            
            <div className="header_icons_wrapper">
                <button className="mobile_icons_btn" onClick={() => setIsIconsOpen(!isIconsOpen)}>
                    <FaEllipsisV />
                </button>
                <div className={`header_icons ${isIconsOpen ? 'active' : ''}`}>
                    <div className="icon">
                        <FaRegHeart />
                        <span className='count'>
                            {favoriteItems?.length || 0}
                        </span>

                    </div>
                    <div className="icon">
                        <Link to="/cart">
                            <TiShoppingCart />
                            <span className='count'>
                                {cartItems.length}
                            </span>
                        </Link>

                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TopHeader