import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../Hooks/useTitle";
import AdminProductForm from "../../Components/Admin/AdminProductForm";
import AdminProductList from "../../Components/Admin/AdminProductList";
import { toast } from "react-toastify";

const AdminPage = () => {
  useTitle("Admin Dashboard - CodeBook");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("email");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleAddProduct = (formData) => {
    // In Lesson 7, this will send to json-server API
    const newProduct = {
      ...formData,
      id: Date.now() // Temporary ID generation
    };
    toast.success("Product added successfully! (Demo mode - not saved to database)");
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProduct = (id) => {
    // In Lesson 7, this will send delete request to json-server API
    console.log("Would delete product:", id);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
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
              onDelete={handleDeleteProduct}
            />
          </div>
        ) : (
          <div>
            <AdminProductForm
              onSubmit={handleAddProduct}
              initialProduct={editingProduct}
            />
          </div>
        )}
      </div>

      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
          📝 Admin Features in This Lesson
        </h3>
        <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
          <li>✓ Protected admin routes (requires adminUser flag in localStorage)</li>
          <li>✓ Product form with validation</li>
          <li>✓ Product list with edit/delete actions</li>
          <li>✓ Tab navigation between views</li>
          <li>✓ Demo mode - changes not persisted (upgraded in Lesson 7)</li>
        </ul>
      </div>

      <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-2">
          💡 How to Access Admin Dashboard
        </h3>
        <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-3">
          To test the admin features:
        </p>
        <ol className="text-yellow-800 dark:text-yellow-200 text-sm space-y-2 ml-4 list-decimal">
          <li>Open browser DevTools (F12)</li>
          <li>Go to Console tab</li>
          <li>Run: <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">localStorage.setItem('adminUser', true)</code></li>
          <li>Visit <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">/admin</code></li>
          <li>You'll now see the admin dashboard (use any email/password to login first)</li>
        </ol>
      </div>
    </main>
  );
};

export default AdminPage;