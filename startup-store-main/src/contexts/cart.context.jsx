import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  isCartOpen: false, 
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeCartItems: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
})

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItems = cartItems.find(cartItem => cartItem.id === productToAdd.id)

  if(existingCartItems) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1} 
      : cartItem
    )
  }
  return [...cartItems, {...productToAdd, quantity: 1}]
}


const removeCartItems = (cartItems, cartItemToRemove) => {
  //find the cart Item to remove
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id)

  //check if quantity is equal to 1, if it is remove the item
  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id) 
  }
  //return back cartItems with matching cart item with reduced quantity
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
  ?  { ...cartItem, quantity: cartItem.quantity - 1} 
  : cartItem)
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)


export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount ] = useState(0)
  const [cartTotal, setCartTotal ] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      console.log(total);
      return total + cartItem.quantity
    }, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => {
      return total + (cartItem.quantity * cartItem.price);
    }, 0)
    setCartTotal(newCartTotal)
  }, [cartItems])
  
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItems(cartItems, cartItemToRemove))
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  }
  
  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems, 
    cartCount,
    cartTotal,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}