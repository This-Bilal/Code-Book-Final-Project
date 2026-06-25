import React, { useState } from 'react'
import { useCart } from '../../../context'
import CartCard from './CartCard'
import Checkout from "./Checkout"
import { BiRightArrow } from "react-icons/bi"

const CartList = () => {
    const [checkout, setCheckout] = useState(false)
    const {cartList, total} = useCart()
    
  return (
    <>
        <section>
            <p className=' text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8'>
                My Cart ({cartList.length})
            </p>
        </section>

        <section>
            {
                cartList.map((product) => (
                    <CartCard key={product.id} product={product}/>
                ))
            }
        </section>

        <section className=' max-w-4xl m-auto'>
            <div className=' flex flex-col p-2 border-b dark:border-slate-700 text-lg dark:text-slate-100'>
                <p className=' flex justify-between py-2'>
                    <span className=' font-semibold'>
                        Total Amount
                    </span>
                    <span>
                        ${total}
                    </span>
                </p>
            </div>

            <div className=' text-right my-5'>
                <button
                    className=' text-right inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 font-medium rounded-lg text-base px-7 py-2.5 mr-2'
                    onClick={() => setCheckout(true)}
                    type='button'
                >
                    PLACE ORDER <BiRightArrow/>
                </button>
            </div>
        </section>

        {checkout && <Checkout setCheckout={setCheckout}/>}
    </>
  )
}

export default CartList