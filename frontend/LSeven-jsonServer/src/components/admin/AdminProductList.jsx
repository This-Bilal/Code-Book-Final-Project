import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { useFilter } from "../../context/FilterContext";

const AdminProductList = ({ onEdit, onDelete }) => {
  const { productList, setProductList } = useFilter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load sample products for demonstration
    const sampleProducts = [
      {
        id: 10001,
        name: "Basics To Advanced In React",
        price: 29,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        best_seller: true,
        overview: "Learn React from basics to advanced concepts",
      },
      {
        id: 10002,
        name: "Django Framework for Beginners",
        price: 19,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        best_seller: false,
        overview: "Master Django web development",
      },
      {
        id: 10003,
        name: "The Future of Design Systems",
        price: 29,
        rating: 3,
        poster:
          "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        best_seller: false,
        overview: "Modern design system principles",
      },
      {
        id: 10004,
        name: "The Complete Guide to Backend Development",
        price: 99,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        best_seller: true,
        overview: "Full-stack backend development guide",
      },
      {
        id: 10005,
        name: "Build a Blockchain from Scratch in Go",
        price: 19,
        rating: 3,
        poster:
          "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        best_seller: false,
        overview: "Blockchain development with Go",
      },
      {
        id: 10006,
        name: "Frontend Fastlane Plan With Projects",
        price: 99,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        best_seller: false,
        overview: "Fast-track frontend development",
      },
      {
        id: 10007,
        name: "Master the Code Review",
        price: 19,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        best_seller: false,
        overview: "Code review best practices",
      },
      {
        id: 10008,
        name: "JavaScript Basics To Advance",
        price: 29,
        rating: 5,
        poster:
          "https://images.unsplash.com/photo-1613490900233-141c5560d75d?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        best_seller: true,
        overview: "Complete JavaScript mastery guide",
      },
    ];

    setProducts(sampleProducts);
    setProductList(sampleProducts);
  }, [setProductList]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      setProductList(updatedProducts);
      toast.success("Product deleted successfully");
      if (onDelete) onDelete(id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Name
              </th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Price
              </th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Rating
              </th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Best Seller
              </th>
              <th className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3 dark:text-gray-300">{product.name}</td>
                <td className="px-4 py-3 dark:text-gray-300">
                  ${product.price}
                </td>
                <td className="px-4 py-3 dark:text-gray-300">
                  {product.rating}/5
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      product.in_stock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.in_stock ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      product.best_seller
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product.best_seller ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-center gap-2">
                  <button
                    onClick={() => onEdit && onEdit(product)}
                    className="text-blue-600 hover:text-blue-700 transition"
                    aria-label={`Edit ${product.name}`}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-700 transition"
                    aria-label={`Delete ${product.name}`}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400">
        Total Products: {products.length}
      </div>
    </div>
  );
};

export default AdminProductList;
