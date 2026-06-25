import { useReducer } from 'react'
import { createContext } from 'react'
import { cartReducer } from '../reducers'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useContext } from 'react'
const cartInitialState ={
    cartList: [],
    total: 0,
    loading: false
}

const CartContext = createContext(cartInitialState)

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    // Load cart and localstorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('cart')

        if (saved) {
            const {cartList, total} = JSON.parse(saved)

            dispatch({
                type: 'LOAD_CART',
                payload: {products: cartList, total}
            })
        }
    }, [])

    // Save cart to localStorage whenever the state changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify({
            cartList: state.cartList,
            total: state.total
        }))
    }, [state.cartList, state.total])

    const addToCart = (product) => {
        try {
            dispatch ({type: 'SET_LOADING', payload: true})

            // Note: the total there is for total price not in quantity
            const newCartList = [...state.cartList, product]
            const newTotal = Number((state.total + Number(product.price || 0)).toFixed(2))

            dispatch({
                type: 'ADD_TO_CART',
                payload: {
                    products: newCartList,
                    total: newTotal
                }
            })

            toast.success('Item added to cart')
        } catch (error) {
            toast.error(
                error.message || 'Failed to add item to cart. Please try again.'
            )
            console.log(error);
        } finally {
            dispatch({type: 'SET_LOADING', payload: false})
        }
    }

    const removeFromCart = (productId) => {
        try {
            dispatch({tpe: 'SET_LOADING', payload: true})

            // Find the product in the cart list by its id
            const product = state.cartList.find(p => p.id === productId)

            // If the product exists, create a new cartList without then product and update the total
            if (product) {
                const newCartList = state.cartList.filter(p => p.id !== productId)
                const newTotal = Number((state.total - Number(product.price || 0).toFixed(2)))

                dispatch({
                    type: 'REMOVE_FROM_CART',
                    payload: {
                        products: newCartList,
                        total: newTotal
                    }
                })

                toast.success('Item removed from cart!')
            }
        } catch (error) {
            toast.error(
                error.message || 'Failed to remove item from cart. Please try again later.'
            )
            console.log(error);
        } finally {
            dispatch({
                type: 'SET_LOADING',
                payload: false
            })
        }
    }

    const clearCart = () => {
        try {
            dispatch({type: 'SET_LOADING', payload: true})
            dispatch({type: 'CLEAR_CART',
                payload: {
                    products: [],
                    total: 0
                }
            })
            toast.success('Cart cleared successfully!')
        } catch (error) {
            toast.error(error.message || 'Failed to clear cart. Please try again later.')
            console.log(error);
        } finally {
            dispatch({type: 'SET_LOADING', payload: false})
        }
    }

    const value = {
        cartList: state.cartList,
        total: state.total,
        loading: state.loading,
        addToCart,
        removeFromCart,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error ('useCart must be used within a CartProvider')
    }

    return context
}

