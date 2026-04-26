import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/logo.png'
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import './header.css'
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { FavoriteContext } from '../context/FavoriteContext';
import SearchBox from './SearchBox';

const TopHeader = () => {
    const {cartItems} = useContext(CartContext);
    const {favoriteItems} = useContext(FavoriteContext);
    console.log(cartItems);
  return (
    <div className='top_header'>
        <div className='container'>
            <Link className='logo' to="/">
                <img src={logo} alt="logo" />
            </Link>

            <SearchBox />

            
            <div className="header_icons">
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
  )
}

export default TopHeader