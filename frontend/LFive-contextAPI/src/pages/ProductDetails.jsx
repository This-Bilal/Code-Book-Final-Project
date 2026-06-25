import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "../components";
import { useTitle } from "../hooks/useTitle";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useTitle('Product details - Codebook')

  useEffect(() => {
    const sampleProducts = {
      10001: {
        id: 10001,
        name: "Basics To Advanced In React",
        price: 29,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        overview: "React is a JavaScript library for building user interfaces.",
        long_description:
          "React is a JavaScript library used to build interactive user interfaces. It's declarative, efficient, and component-based, making UI development predictable and scalable.",
      },
      10004: {
        id: 10004,
        name: "The Complete Guide to Backend Development",
        price: 99,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        overview:
          "This guide walks you through everything you need to know to become a skilled backend developer.",
        long_description:
          "Backend development refers to the server-side of web development—the part you don't see but that powers everything behind the scenes.",
      },
      10008: {
        id: 10008,
        name: "JavaScript Basics To Advance",
        price: 29,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1613490900233-141c5560d75d?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        overview: "A comprehensive, hands-on program for learning JavaScript.",
        long_description:
          "JavaScript Basics to Advance is a complete journey through the JavaScript programming language.",
      },
    };

    setProduct(sampleProducts[id] || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <main className=" mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className=" text-center">
          <p className=" dark:text-white">Loading...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className=" mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className=" text-center">
          <p className=" dark:text-white">Product not found.</p>
          <button
            onClick={() => navigate("/products")}
            className=" mt-4 bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }
  return (
    <main className=" mx-auto max-w-7xl px-4 md:px-6 py-12">
      <button
        onClick={() => navigate("/products")}
        className=" mb-6 cursor-pointer text-rose-600 hover:text-rose-700 transition"
      >
        &larr; Back to Products
      </button>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={product.poster}
            alt={product.name}
            className=" w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold dark:text-white mb-4">
            {product.name}
          </h1>

          <div className="mb-6">
            <Rating rating={product.rating} />
          </div>

          <div className="mb-6">
            <p className="text-2xl font-semibold text-rose-600 dark:text-rose-500">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-600 text-sm mt-2 dark:text-gray-400">
              {product.in_stock ? "In Stock" : "Out of Stock"}
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
            className={`w-full cursor-pointer bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 rounded-lg ${!product.in_stock ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {product.in_stock ? "Add to cart" : "Out of stock"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
