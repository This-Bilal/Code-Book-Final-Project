import React from 'react'
import { useCart } from '../../context'
import { useTitle } from '../../hooks/useTitle'
import CartList from './Components/CartList'
import CartEmpty from './Components/CartEmpty'


const CartPage = () => {

  const {cartList} = useCart()
  useTitle(`cart (${cartList?.length || 0})`)
  return (
    <div>
      {(cartList?.length || 0) > 0 ? <CartList/> : <CartEmpty/>}
    </div>
  )
}

export default CartPage