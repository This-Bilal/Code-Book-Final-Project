import { apiRequest, EBOOK_ENDPOINT } from "../config/api";

const normaliseSearch = (value = "") => value.toString().toLowerCase()

const matchesSearch = (product, searchTerm) => {
    
    const normalised = normaliseSearch(searchTerm)
    
    if (!normalised) {
        return true
    }

    const haystack = [
        product.name,
        product.overview,
        product.longDescription || product.long_description,
        product.price,
        product.id
    ]

    .filter(Boolean)
    .map((entry) => normaliseSearch(entry))
    .join(" ")

    return haystack.includes(normalised)
}

/**
 * Transform backend product to match frontend format
 * Handles both snake_case and camelCase field names
 */

export const transformProduct = (product) => {
    return {
        ...product,
        id: product.id || product._id,
        long_description: product.longDescription || product.long_description,
        longDescription: product.longDescription || product.long_description,
        in_stock: product.inStock !== undefined ? product.inStock : (product.in_stock !== undefined ? product.in_stock : true),
        inStock: product.inStock !== undefined ? product.inStock : (product.in_stock !== undefined ? product.in_stock : true),
        best_seller: product.bestSeller !== undefined ? product.bestSeller : (product.best_seller !== undefined ? product.best_seller : false),
        bestSeller: product.bestSeller !== undefined ? product.bestSeller : (product.best_seller !== undefined ? product.best_seller : false)

    }
}

/**
 * Get all products with optimal filter
 * @param {string} searchTerm
 * @returns {Array} array of products
 */

export async function getProductList(searchTerm = "") {
    try {
        const products = await apiRequest(EBOOK_ENDPOINT.GET_ALL_EBOOKS, {
            method: "GET"
        })
     
        const transformedProducts = products.map(transformProduct)

        // Client side filtering
        if (searchTerm) {
            return transformedProducts.filter((product => matchesSearch(product, searchTerm)))
             
        }

        return transformedProducts
    } catch (error) {
        throw new Error(error.message || "Failed to fetch products")
    }
}

/**
 * Get a single product
 * @param {string/number} id - product ID
 * @returns {object} product
 */

export const getProduct = async (id) => {
    try {
        const product = await apiRequest(EBOOK_ENDPOINT.GET_AN_EBOOK(id), {
            method: "GET"
        })

        if (!product) {
            throw new Error("Product not found")
        }

        return transformProduct(product)
    } catch (error) {
        throw new Error(error.message || "Product not found")
    }
}

/**
 * Get featured products (best sellers)
 * @returns {Array} Array of featured products
 */

export const getFeaturedList = async () => {
    try {
        const products = await apiRequest(EBOOK_ENDPOINT.GET_ALL_EBOOKS, {
            method: "GET"
        })

        // Filter products by bestSeller
        const featured = products
            .filter((product) => product.bestSeller === true)
            .map(transformProduct)

        return featured
    } catch (error) {
        throw new Error(error.message || "Failed to fetch featured product")
    }
}