import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "../reducers";
import { toast } from "react-toastify";
import { addToCartAPI, clearCartAPI, getUserCart, removeFromCartAPI } from "../services";
import { apiClient } from "../config/api";
import { toastOptions } from "../config/utils";

const cartInitialState = {
    cartList: [],
    total: 0,
    loading: false
}

const CartContext = createContext(cartInitialState);

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);

    const loadCart = async () => {
        try {
            dispatch({type: "SET_LOADING", payload: true})
            const cartData = await getUserCart()

            dispatch({
                type: "LOAD_CART",
                payload: { 
                    products: cartData.cartList,
                    total: cartData.total
                }
            })

            return cartData
        } catch (error) {
            console.error("Error loading cart", error);
            toast.error(error.message || "Failed to load cart", toastOptions)
            return null
        } finally {
            dispatch({type: "SET_LOADING", payload: false})
        }
    }

    useEffect(() => {
        loadCart()
    }, [])

   const addToCart = async (product) => {
    try {
        dispatch({type: "SET_LOADING", payload: true})
        const cartData = await addToCartAPI(product)
        dispatch({type: "ADD_TO_CART", payload: {
            products: cartData.cartList,
            total: cartData.total
        }})
        
        toast.success("Item added to Cart", toastOptions)
    } catch(error) {
        toast.error(error.message || "Failed to add item to Cart", toastOptions)
    } finally {
        dispatch({type: "SET_LOADING", payload: false})
    }
}

    const removeFromCart = async (product) => {
        try {
            dispatch({type: "SET_LOADING", payload: true})
            const cartData = await removeFromCartAPI(product)

            dispatch({type: "REMOVE_FROM_CART",
                payload: {
                    products: cartData.cartList,
                    total: cartData.total
                }
            })

            toast.success("Item removed from cart", toastOptions)
        } catch (error) {
            toast.error(error.message || "Failed to remove item from cart", toastOptions)
        } finally {
            dispatch({type: "SET_LOADING", payload: false})
        }
    }

    const clearCart = async () => {
        try {
            dispatch({type: "SET_LOADING", payload: true})
            const cartData = await clearCartAPI()

            dispatch({
                type: "CLEAR_CART",
                payload: {
                    products: cartData.cartList,
                    total: cartData.total
                }
            })

            toast.success("Cart cleared successfully", toastOptions)
        } catch (error) {
            toast.error(error.message || "Failed to clear cart", toastOptions)
        } finally {
            dispatch({type: "SET_LOADING", payload: false})
        }
    }

    const clearCartLocal = () => {
        dispatch({
            type: "CLEAR_CART",
            payload: {
                products: [],
                total: 0
            }
        })
    }

    const value = {
        cartList: state.cartList,
        total: state.total,
        loading: state.loading,
        addToCart,
        removeFromCart,
        clearCart,
        clearCartLocal,
        loadCart
    }

    return <CartContext.Provider value={ value }>
            {children}
    </CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context
}