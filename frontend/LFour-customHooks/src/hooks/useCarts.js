import { useCallback, useEffect, useState } from "react"

const useCarts = () => {
  const [cartList, setCartList] = useState([])
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const addToCart = useCallback((product) => {
      setLoading(true);

      try {
        setCartList(prev => [...prev, product]);
        setTotal(prev => prev + product.price);
      } catch (error) {
        console.error('Error adding to cart', error)
      } finally {
        setLoading(false)
      }
  }, [])

  const removeFromCart = useCallback((productId) => {
    setLoading(true)
    try {
      const product = cartList.find(item => item.id === productId);
      if (product) {
        setCartList(prev => prev.filter(item => item.id === productId))
        setTotal(prev => prev - Number(product.price || 0))
      }
    } catch (error) {
      console.error('Error removing from cart', error) 
    } finally {
      setLoading(false)
    }
  }, [])

  const clearCart = useCallback(() => {
    setLoading(true)
    try {
        setCartList([])
        setTotal(0)
    } catch (error) {
        console.error('Error clearing cart', error)
    } finally {
      setLoading(false)
    }
  }, [])

  return {

  }
}

export default useCarts