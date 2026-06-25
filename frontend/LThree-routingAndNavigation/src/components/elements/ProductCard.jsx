import Rating from "./Rating"

const ProductCard = ({product}) => {

  if (!product) return null

  const {id, name, price, rating, poster, in_stock} = product
  return (
    <div className=" border border-slate-700 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-shadow dark:bg-gray-800">

      <div className=" relative">
        <img src={poster} alt={name} className=" w-full h-48 object-cover"/>
        {!in_stock && (
          <div className=" absolute inset-0 bg-black opacity-50 flex items-center justify-center">
            <span className=" text-white font-bold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className=" p-4">
        <h3 className=" font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {name}
        </h3>
        <Rating rating={rating}/>
        <div className=" flex justify-between items-center mt-4">
          <span className=" text-lg font-bold text-rose-600 dark:text-rose-500">
            ${price}
          </span>

          <button
          disabled={!in_stock}
          className=" px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 disabled:bg-gray-400"
          > Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard