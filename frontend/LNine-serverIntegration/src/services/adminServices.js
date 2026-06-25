import { getUser } from "./index";
import { apiRequest, EBOOK_ENDPOINT } from "../config/api";
import { transformProduct } from "./productServices";

/**
 * Normalise product data from api submission
 */

const normaliseProduct = (product) => {
    const {
        name, 
        overview,
        long_description,
        longDescription,
        rating,
        poster,
        size,
        in_stock,
        inStock,
        bestSeller,
        best_seller,
        price
    } = product

    return {
        name: name?.trim() || "",
        overview: overview?.trim() || "",
        longDescription: longDescription?.trim() || long_description?.trim() || "",
        rating: Number(rating),
        poster: poster?.trim() || "",
        size: Number(size),
        inStock: typeof inStock === "boolean" ? inStock : Boolean(in_stock),
        bestSeller: typeof bestSeller === "boolean" ? bestSeller : Boolean(best_seller),
        price: Number(price)
    }
}

/**
 * Create a new product
 * @param {Object} ebookData - product data
 * @returns {Object} created ebook
 */

const createEbook = async (ebookData) => {
    try {
        const productData = normaliseProduct(ebookData)

        if (!productData.name || !productData.overview || !productData.longDescription) {
            throw new Error("Name, Overview, long Description are required")
        }

        if (!productData.price || productData.price <= 0) {
            throw new Error("Valid price is required")
        }

        if (!productData.rating || productData.rating < 1 || !productData.rating > 5) {
            throw new Error("Rating must between 1 and 5")
        }

        const createdProduct = await apiRequest(EBOOK_ENDPOINT.CREATE_EBOOK, {
            method: "POST",
            body: JSON.stringify(productData)
        })

        return transformProduct(createdProduct)
    } catch (error) {
        throw new Error(error.message || "Failed to create product")
    }
}

/**
 * Update existing ebook
 * @param {string|number} id - product id as the request parameter
 * @param {Object} ebookData product to be updated
 * @returns {Object} updated product
 */

const updateEbook = async (id, ebookData) => {
    try {
        const productData = normaliseProduct(ebookData)

        const updatedProduct = await apiRequest(EBOOK_ENDPOINT.UPDATE_EBOOK(id), {
            method: "PATCH",
            body: JSON.stringify(productData)
        })

        return transformProduct(updatedProduct)
    } catch (error) {
        throw new Error(error.message || "Failed to update product")
    }
}

/**
 * Check if user is an admin
 * @returns {Promise<boolean>} true if admin
 */

const checkAdminStatus = async () => {
    try {
        const user = await getUser()
        return Boolean(user?.isAdmin)
    } catch (error) {
        return false
    }
}

const adminService = {
    createEbook,
    updateEbook,
    checkAdminStatus
}

export default adminService