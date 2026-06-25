import { Link } from "react-router-dom"
import Rating from "./Rating"
import { useEffect, useState } from "react"
import {IoMdAdd} from "react-icons/io"
import {FiMinusCircle} from "react-icons/fi"

const ProductCard = ({product, cartList: propCartList, addToCart: propAddToCart, removeFromCart: propRemoveFromCart}) => {

  const [localCart, setLocalCart] = useState([])
  const cartList = propCartList ?? localCart

  const addHandler = propAddToCart ?? ((p) => {
    setLocalCart(prev => prev.find(item => item.id === p.id) ? prev : [...prev, p])
  })

  const removeHandler = propRemoveFromCart ?? ((p) => {
    setLocalCart(prev => prev.filter(item => item.id !== p.id))
  })

  const [inCart, setInCart] = useState(false)

  const {id, name, price, rating, poster, inStock, in_stock, best_seller, overview} = product

  const isInStock = typeof in_stock === "boolean" ? in_stock : (typeof inStock === "boolean" ? inStock : true)

  useEffect(() => {
    if(!cartList) {
      setInCart(false)
      return;
    }

    const productInCart = cartList.find(item => item.id === product.id)
    setInCart(!!productInCart)
  }, [cartList, product.id])

  return (
    <div className=" m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link
        to={`/products/${id}`}
        className=" relative"
      >
        {best_seller && 
          <span className=" absolute top-4 left-2 px-2 bg-orange-500 opacity-90 text-white rounded">
            Best Seller
          </span>}
          <img
            className=" rounded-t-lg w-full h-64 object-cover" 
            src={poster} 
            alt={name} 
          />
      </Link>
      <div className=" p-5">
          <Link
            to={`/products/${id}`}
            className=" hover:text-rose-600 transition"
          >
            <h5 className=" mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </Link>

          <p className=" mb-3 font-normal text-gray-700 dark:text-gray-400">
            {overview}
          </p>

          <div className=" flex items-center my-2">
            <Rating rating={rating}/>
          </div>

          <p className=" flex justify-between items-center"> 
            <span className=" text-2xl font-bold text-rose-600 dark:text-rose-500">
              <span>
                ${price}
              </span>
            </span>
            {
              !inCart && 
              <button 
                onClick={() => addHandler(product)}
                className={`inline-flex items-center py-2 px-3 text-sm cursor-pointer gap-2 font-medium text-white text-center bg-rose-600 rounded-lg hover:bg-rose-700 ${isInStock ? "" : " cursor-not-allowed"}`} disabled={!isInStock}
              >
                Add to cart
                <IoMdAdd size={20}/>
              </button>
            }

            {
              inCart && 
              <button 
                onClick={() => removeHandler(product)}
                className={`inline-flex items-center py-2 px-3 text-sm cursor-pointer gap-2 font-medium text-white text-center bg-red-600 rounded-lg hover:bg-red-800 ${isInStock ? "" : " cursor-not-allowed"}`} disabled={!isInStock}
              >
                <FiMinusCircle size={20}/>
                Remove item
              </button>
            }
          </p>
      </div>
    </div>
  )
}

export default ProductCard