import React, { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import useFilter from "../../hooks/useFilter";
import ProductCard from "../../components/elements/ProductCard";
import { useTitle } from "../../hooks/useTitle";
const ProductList = () => {

  useTitle('All eBooks - Shop Programming eBooks Online | Codebook')
  const [show, setShow] = useState(false);
  const{
    productList,
    setProductList,
    filteredProducts,
    sortBy,
    setSortBy,
    onlyInStock,
    setOnlyInStock,
    bestSellerOnly,
    setBestSellerOnly,
    ratings,
    setRatings,
    clearFilters
  } = useFilter()

  useEffect(() => {
    const sampleProducts = [
      {
        id: 10001,
        name: "Basics To Advanced In React",
        price: 29,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
      },
      {
        id: 10002,
        name: "Django Framework for Beginners",
        price: 19,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: false,
      },
      {
        id: 10003,
        name: "The Future of Design Systems",
        price: 29,
        rating: 3,
        poster:
          "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: false,
      },
      {
        id: 10004,
        name: "The Complete Guide to Backend Development",
        price: 99,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
      },
      {
        id: 10005,
        name: "Build a Blockchain from Scratch in Go",
        price: 19,
        rating: 3,
        poster:
          "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
      },
      {
        id: 10006,
        name: "Frontend Fastlane Plan With Projects",
        price: 99,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: false,
      },
      {
        id: 10007,
        name: "Master the Code Review",
        price: 19,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
      },
      {
        id: 10008,
        name: "JavaScript Basics To Advance",
        price: 29,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1613490900233-141c5560d75d?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
      },
      {
        id: 10009,
        name: "Python Deep Dive With Projects",
        price: 29,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: false,
      },
      {
        id: 10010,
        name: "Mastering Software Technique",
        price: 19,
        rating: 4,
        poster:
          "https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
      },
      {
        id: 10011,
        name: "Web Development Foundation",
        price: 29,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
      },
      {
        id: 10012,
        name: "Mastering Git and GitHub",
        price: 9,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: false,
      },
    ];
    // console.log(sampleProducts)
    setProductList(sampleProducts);
  }, [setProductList]);
  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold dark:text-white">
            All eBooks ({filteredProducts.length})
          </h1>
          <button
            onClick={() => setShow(!show)}
            className="inline-flex items-center cursor-pointer rounded-md p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            <MdMenu size={24} />
          </button>
        </div>

        {/* Filter Section */}
        {show && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-md">
            <h3 className="font-bold text-lg dark:text-white mb-4">Filters</h3>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="inStock" className="ml-2 dark:text-gray-300">
                  In Stock Only
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="bestseller"
                  checked={bestSellerOnly}
                  onChange={(e) => setBestSellerOnly(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="bestseller" className="ml-2 dark:text-gray-300">
                  Best Sellers Only
                </label>
              </div>

              <div>
                <label className="block dark:text-gray-300 mb-2">Sort By</label>
                <select
                  value={sortBy || ""}
                  onChange={(e) => setSortBy(e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="">No Sort</option>
                  <option value="lowtohigh">Price: Low to High</option>
                  <option value="hightolow">Price: High to Low</option>
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="w-full mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No products match your filters
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductList;
