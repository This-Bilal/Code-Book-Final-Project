import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTitle } from "../Hooks/useTitle";
import Rating from "../Components/Elements/Rating";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useTitle(`Product Details - CodeBook`);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In this lesson, we're using sample data
    // Later lessons will fetch from an API
    const sampleProducts = {
      10001: {
        id: 10001,
        name: "Basics To Advanced In React",
        price: 29,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        overview: "React is a JavaScript library for building user interfaces.",
        long_description: "React is a JavaScript library used to build interactive user interfaces. It's declarative, efficient, and component-based, making UI development predictable and scalable."
      },
      10004: {
        id: 10004,
        name: "The Complete Guide to Backend Development",
        price: 99,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        overview: "This guide walks you through everything you need to know to become a skilled backend developer.",
        long_description: "Backend development refers to the server-side of web development—the part you don't see but that powers everything behind the scenes."
      },
      10008: {
        id: 10008,
        name: "JavaScript Basics To Advance",
        price: 29,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1613490900233-141c5560d75d?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        overview: "A comprehensive, hands-on program for learning JavaScript.",
        long_description: "JavaScript Basics to Advance is a complete journey through the JavaScript programming language."
      }
    };

    setProduct(sampleProducts[id] || null);
    setLoading(false);
  }, [id]);

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

          <button 
            disabled={!product.in_stock}
            className="w-full px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {product.in_stock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;