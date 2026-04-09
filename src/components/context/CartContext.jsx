import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'



// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = React.createContext();

const CartProvider = ({children}) => {

    const [cartItems , setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const addTocart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    }
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
  return (
    
    <CartContext.Provider value={{cartItems, addTocart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider