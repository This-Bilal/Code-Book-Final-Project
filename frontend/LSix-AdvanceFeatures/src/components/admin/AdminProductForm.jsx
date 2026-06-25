import { useState } from "react";
import { useTitle } from "../../hooks/useTitle";
import { toast } from "react-toastify";

const AdminProductForm = ({onSubmit, initialProduct = null}) => {
    useTitle('Add Product - Admin - Codebook')

    const [formData, setFormData] = useState(
        initialProduct || {
            name: '',
            price: '',
            rating: 5,
            poster: '',
            in_stock: true,
            best_seller: false,
            overview: '',
            long_description: ''
        }
    )

    const handleChange = () => {
        const {name, value, type, checked} = e.target.value
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'Number' ? Number(value) : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.name || !formData.price || formData.poster) {
            toast.error('Please fill in all required fields (name, price, poster)')
            return;
        }

        onSubmit(formData)

        if (!initialProduct) {
            setFormData({
                name: '',
                price: '',
                rating: 5,
                poster: '',
                in_stock: true,
                best_seller: false,
                overview: '',
                long_description: ''
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold dark:text-white mb-6">
                {initialProduct ? 'Edit Product': 'Add new Product'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Product Name*
                    </label>

                        <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                        required
                        />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Price ($)*
                    </label>

                        <input 
                        type="number" 
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step='0.01'
                        min='0'
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                        required
                        />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Rating (1-5)
                    </label>

                        <input 
                        type="number" 
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min='1'
                        max='5'
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                        />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Image Url *
                    </label>

                        <input 
                        type="url" 
                        name="poster"
                        value={formData.poster}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                        required
                        />
                </div>
            
            </div>

                <div className="mt-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Short Overview
                    </label>

                        <textarea 
                        name="overview"
                        value={formData.overview}
                        onChange={handleChange}
                        rows='2'
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                        />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Detailed Description
                    </label>

                        <textarea 
                        name="long_description"
                        value={formData.long_description}
                        onChange={handleChange}
                        rows='4'
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                        />
                </div>

                <div className="mt-4 flex gap-4">
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <input 
                        type="checkbox" 
                        name="in_stock"
                        checked={formData.in_stock}
                        onChange={handleChange}
                        className="w-4 h-4"
                        />
                        In Stock
                    </label>

                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <input 
                        type="checkbox" 
                        name="best_seller"
                        checked={formData.best_seller}
                        onChange={handleChange}
                        className="w-4 h-4"
                        />
                        Best Seller
                    </label>
                </div>

                <button 
                type="submit"
                className="mt-6 w-full bg-rose-600 text-white py-2 rounded-lg font-semibold hover:bg-rose-70 transition"
                >
                    {initialProduct ? 'Update Product' : 'Add Product'}
                </button>
        </form>
    )
}

export default AdminProductForm