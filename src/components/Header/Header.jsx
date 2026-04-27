import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/image.png'
import { FaRegHeart, FaEllipsisV } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";


import { CartContext } from '../../context/CartContext';
import { FavoriteContext } from '../../context/FavoriteContext';
import SearchBox from './SearchBox';

const NavLinks = [
  {title: "Home" , link : "/"},
  { title: "About", link: "/about" },
  { title: "Accessories", link: "/accessories" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
]

const Header = () => {
    const {cartItems} = useContext(CartContext);
    const {favoriteItems} = useContext(FavoriteContext);
    const [isIconsOpen, setIsIconsOpen] = useState(false);

    const location = useLocation()
    const [categories, setCategories] = useState([]);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
      setIsCategoryOpen(false)
      setIsMobileMenuOpen(false)
    },[location])

    useEffect(() => {
      fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
    }, [])

    return (
        <header className="fixed top-0 left-0 right-0 z-[10000] bg-white shadow-sm">
            <div className='w-full'>
                <div className='container mx-auto px-4 w-[90%] max-w-[1350px] flex items-center justify-between py-[15px] flex-wrap gap-[15px]'>
                    <Link className='flex justify-center items-center w-[70px] h-[70px] rounded-full border border-main overflow-hidden bg-white transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_10px_rgba(0,144,240,0.3)]' to="/">
                        <img className="w-full" src={logo} alt="logo" />
                    </Link>

                    <SearchBox />
                    
                    <div className="flex items-center gap-[20px] lg:gap-[30px]">
                        <div className="relative cursor-pointer text-[26px] md:text-[30px] flex items-center justify-center text-heading hover:text-main transition-colors">
                            <FaRegHeart />
                            <span className='absolute -top-[5px] -right-[10px] bg-main text-white w-[20px] h-[20px] text-center leading-[20px] text-[11px] rounded-full'>
                                {favoriteItems?.length || 0}
                            </span>
                        </div>
                        <div className="relative cursor-pointer text-[26px] md:text-[30px] flex items-center justify-center text-heading hover:text-main transition-colors">
                            <Link to="/cart" className="flex items-center justify-center text-heading hover:text-main transition-colors">
                                <TiShoppingCart />
                                <span className='absolute -top-[5px] -right-[10px] bg-main text-white w-[20px] h-[20px] text-center leading-[20px] text-[11px] rounded-full'>
                                    {cartItems.length}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-main relative'>
                <div className="container mx-auto px-4 w-[90%] max-w-[1350px] flex items-center justify-between">
                    <nav className="flex items-center justify-between h-[50px] w-full lg:w-auto flex-1">
                        <div className="w-1/2 lg:w-[220px] h-full relative">
                            <div className="h-full w-full flex justify-between items-center bg-[#0079ca] lg:bg-main px-[15px] cursor-pointer text-white" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                                <div className="flex items-center gap-2">
                                    <IoMdMenu size={20} />
                                    <p className="block text-white text-[14px] lg:text-[15px] font-semibold">Categories</p>
                                </div>
                                <MdOutlineArrowDropDown size={24} />
                            </div>

                            <div className={`absolute top-full left-0 w-full md:w-[220px] bg-white border border-[#999] border-t-0 flex flex-col max-h-[60vh] overflow-y-auto transition-all duration-300 z-[1000] origin-top shadow-lg ${isCategoryOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} >
                                {categories.map((category) => (
                                    <Link className="block p-[14px_10px] border-b border-border-custom last:border-b-0 text-[14px] hover:bg-gray-50 transition-colors" key={category.slug} to={`/category/${category.slug}`}>{category.name}</Link>
                                ))}
                            </div>
                        </div>

                        <button className="flex lg:hidden items-center justify-center gap-2 text-white cursor-pointer bg-transparent border-none px-[15px] w-1/2 h-full border-l border-white/20 hover:bg-white/10 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
                            <span className="font-semibold text-[14px]">Menu</span>
                        </button>

                        <ul className={`lg:flex lg:flex-row lg:static lg:h-full lg:w-auto lg:bg-transparent lg:shadow-none lg:z-auto lg:ml-[20px] ${isMobileMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-main z-[1001] h-max shadow-md' : 'hidden'}`}>
                            {NavLinks.map((item) => (
                                <li key={item.link} className={`flex items-center justify-center lg:justify-start lg:h-full w-full lg:w-auto p-[15px_0] lg:p-[0_25px] border-b border-white/10 lg:border-none hover:bg-white/10 transition-colors ${location.pathname === item.link ? "bg-[#0079ca]" : ""}`}>
                                    <Link className="text-white font-medium w-full text-center lg:text-left" to={item.link}>{item.title}</Link>
                                </li>
                            ))}
                            <li className="flex lg:hidden items-center justify-center w-full p-[15px_0] border-b border-white/10 hover:bg-white/10 transition-colors">
                                <Link className="text-white font-medium w-full text-center" to="/login">Login</Link>
                            </li>
                            <li className="flex lg:hidden items-center justify-center w-full p-[15px_0] hover:bg-white/10 transition-colors">
                                <Link className="text-white font-medium w-full text-center" to="/signup">Sign Up</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="hidden lg:flex gap-[20px] text-[22px] text-white ml-auto">
                        <Link className="hover:text-gray-200 transition-colors" to="/login" title="Login"><PiSignInBold /></Link>
                        <Link className="hover:text-gray-200 transition-colors" to="/signup" title="Sign Up"><FaUserPlus /></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
