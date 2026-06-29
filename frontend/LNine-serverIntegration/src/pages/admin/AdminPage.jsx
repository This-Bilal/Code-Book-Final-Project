import { useState } from "react";
import { useTitle } from "../../hooks/useTitle";
import AdminProductForm from "../../components/admin/AdminProductForm";
import AdminProductList from "../../components/admin/AdminProductList";

const AdminPage = () => {
  useTitle("Admin Dashboard - CodeBook");
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSuccess = () => {
    setActiveTab("products")
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id) => {
    // In Lesson 7, this will send delete request to json-server API
    console.log("Would delete product:", id);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Admin Dashboard</h1>
      </div>

      <div className="mb-6 flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === "products"
              ? "text-rose-600 border-b-2 border-rose-600"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          View Products
        </button>
        <button
          onClick={() => {
            setActiveTab("add");
            setEditingProduct(null);
          }}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === "add"
              ? "text-rose-600 border-b-2 border-rose-600"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          {editingProduct ? "Edit Product" : "Add Product"}
        </button>
      </div>

      <div className="mt-8">
        {activeTab === "products" ? (
          <div>
            <h2 className="text-2xl font-bold dark:text-white mb-6">
              Manage Products
            </h2>
            <AdminProductList
              onEdit={handleEditProduct}
            />
          </div>
        ) : (
          <div>
            <AdminProductForm
              product={editingProduct}
              onSuccess={handleFormSuccess}
            />
          </div>
        )}
      </div>

      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
          📝 Admin Features in This Lesson
        </h3>
        <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
          <li>✓ Server-integrated product management (REST API)</li>
          <li>✓ Real-time product list with search functionality</li>
          <li>✓ Add, edit, and delete products from database</li>
          <li>✓ Product form with validation</li>
          <li>✓ Tab navigation between views</li>
          <li>✓ Protected admin routes (requires adminUser flag)</li>
        </ul>
      </div>

      <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-2">
          💡 Server Integration (Lesson 9 vs Lesson 7)
        </h3>
        <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-3">
          Key differences with backend server:
        </p>
        <ol className="text-yellow-800 dark:text-yellow-200 text-sm space-y-2 ml-4 list-decimal">
          <li>API calls to Express backend for all CRUD operations</li>
          <li>Persistent data stored in MongoDB</li>
          <li>Real-time updates across all users</li>
          <li>Complete form validation from backend</li>
          <li>Proper error handling and user feedback</li>
        </ol>
      </div>
    </main>
  );
};

export default AdminPage;