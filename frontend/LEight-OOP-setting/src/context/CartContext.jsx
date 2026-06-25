import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "../reducers";
import { toast } from "react-toastify";

const cartInitialState = {
    cartList: [],
    total: 0,
    loading: false
}

const CartContext = createContext(cartInitialState);

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            const { cartList, total } = JSON.parse(saved);
            dispatch({
                type: "LOAD_CART",
                payload: { products: cartList, total }
            });
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify({
            cartList: state.cartList,
            total: state.total
        }));
    }, [state.cartList, state.total]);

    const addToCart = (product) => {
        try {
            dispatch({type: "SET_LOADING", payload: true});
            const newCartList = [...state.cartList, product];
            const newTotal = Number((state.total + Number(product.price || 0)).toFixed(2));
            
            dispatch ({
                type: "ADD_TO_CART",
                payload: {
                    products: newCartList,
                    total: newTotal
                }
            });
            toast.success("Item added to cart");
        } catch (error) {
            toast.error(error.message || "Failed to add item to cart");
        } finally {
            dispatch({type: "SET_LOADING", payload: false});
        }
    };

    const removeFromCart = (productId) => {
        try {
            dispatch({type: "SET_LOADING", payload: true});
            const product = state.cartList.find(p => p.id === productId);
            if (product) {
                const newCartList = state.cartList.filter(p => p.id !== productId);
                const newTotal = Number((state.total - Number(product.price || 0)).toFixed(2));
                
                dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: {
                        products: newCartList,
                        total: newTotal
                    }
                });
                toast.success("Item removed from cart");
            }
        } catch (error) {
            toast.error(error.message || "Failed to remove item from cart");
        } finally {
            dispatch({type: "SET_LOADING", payload: false});
        }
    };

    const clearCart = () => {
        try {
            dispatch({type: "SET_LOADING", payload: true});
            dispatch({
                type: "CLEAR_CART",
                payload: {
                    products: [],
                    total: 0
                }
            });
            toast.success("Cart cleared successfully");
        } catch (error) {
            toast.error(error.message || "Failed to clear cart");
        } finally {
            dispatch({type: "SET_LOADING", payload: false});
        }
    };

    const value = {
        cartList: state.cartList,
        total: state.total,
        loading: state.loading,
        addToCart,
        removeFromCart,
        clearCart
    }

    return <CartContext.Provider value={ value }>
            {children}
    </CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context
}