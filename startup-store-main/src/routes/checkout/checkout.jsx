import {useContext} from 'react'
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item';
import './checkout.styles.scss';



const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext)

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='checkout-block'>
          <span>Product</span>
        </div>
         <div className='checkout-block'>
          <span>Description</span>
        </div>
         <div className='checkout-block'>
          <span>Quality</span>
        </div>
         <div className='checkout-block'>
          <span>Price</span>
        </div>
         <div className='checkout-block'>
          <span>Remove</span>
        </div>
      </div>
        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
        ))}
      <span className='total'>Total: ${cartTotal}</span>
    </div>
  )
}

export default Checkout;