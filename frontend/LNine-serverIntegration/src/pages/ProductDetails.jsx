import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import  {useTitle}  from "../hooks/useTitle";
import Rating from "../components/elements/Rating";
import { toast } from "react-toastify";
import { IoMdAdd, IoMdArrowBack } from "react-icons/io";
import {FaTrashAlt} from "react-icons/fa"
import { getProduct } from "../services";
import { toastOptions } from "../config/utils";
import { useCart } from "../context";

const ProductDetails = () => {
  const {cartList, addToCart, removeFromCart} = useCart()
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false)
  const [error, setError] = useState("")
  
  useTitle(product?.name || "");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const data = await getProduct(id)
        setProduct(data)
      } catch (error) {
        setError(error.message)
        toast.error(error.message, toastOptions)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [id]);

  useEffect(() => {
    const productInCart = cartList.find(item => item.id === product.id)
      if (productInCart) {
          setInCart(true)
      } else {
          setInCart(false)
      }
  }, [cartList, product.id])

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="text-center">
          <p className="dark:text-white">Loading...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="text-center">
          <p className="dark:text-white mb-4">Product not found</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-rose-600 text-white px-6 py-2 rounded hover:bg-rose-700 transition"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-12">
      <button 
        onClick={() => navigate('/products')}
        className="mb-6 text-rose-600 hover:text-rose-700 transition"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.poster}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold dark:text-white mb-4">
            {product.name}
          </h1>

          <div className="mb-4">
            <Rating rating={product.rating} />
          </div>

          <div className=" my-4 select-none">
            {
              product.best_seller && 
              <span className=" font-semibold text-amber-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                BEST SELLER
              </span>
            }

            {
              product.in_stock && 
              <span className=" font-semibold text-emerald-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                INSTOCK
              </span>
            }

            {
              !product.in_stock &&
              <span className=" font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                OUT OF STOCK
              </span>
            }

            <span className=" font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
              {product.size}
            </span>
          </div>

          <div className="mb-6">
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-500">
              ${product.price}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {product.in_stock ? "✓ In Stock" : "✗ Out of Stock"}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold dark:text-white mb-2">
              Overview
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {product.overview}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold dark:text-white mb-2">
              Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {product.long_description}
            </p>
          </div>

          <p className=" my-3">
            {
              !inCart &&
              <button
                onClick={() => addToCart(product)}
                className={`inline-flex items-center py-2 cursor-pointer px-5 text-lg font-medium text-center text-white bg-rose-600 rounded-lg hover:bg-rose-700 ${product.in_stock? "" : "cursor-not-allowed"}`}
                disabled = {!product.in_stock}
              >
                Add To Cart
                <i className=" ml-1">
                  <IoMdAdd/>
                </i>
              </button>
            }

            {
              inCart &&
              <button
                onClick={() => removeFromCart(product)}
                className={`inline-flex items-center py-2 cursor-pointer px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 ${product.in_stock? "" : "cursor-not-allowed"}`}
                disabled = {!product.in_stock}
              >
                Remove Item
                <i className=" ml-1">
                  <FaTrashAlt/>
                </i>
              </button>
            }
          </p>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;