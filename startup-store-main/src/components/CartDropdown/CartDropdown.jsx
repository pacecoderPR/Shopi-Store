import {useContext} from 'react'
import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItems, EmptyMessage } from './CartDropdown.styles.jsx';


const CartDropdown = () => {

  const {cartItems} = useContext(CartContext)
  const navigate = useNavigate()
  
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map(cartItem => (
          <CartItem key={cartItem.id} cartItem={cartItem} />))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
        <Button 
          onClick={() => navigate('/checkout')} buttonClass='base'
        >GO TO CHECKOUT</Button>      
      </CartItems>
    </CartDropdownContainer>
  )
}

export default CartDropdown