import apiRequest from "../config/api";

export const getAdminProducts = async () => {
    return await apiRequest ('/products')
}

export const createProduct = async (product) => {
    return await apiRequest ('/products', {
        method: 'POST',
        body: JSON.stringify(product),
    })
}

export const updateProduct = async (id, product) => {
    return await apiRequest (`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product)
    })
}

export const deleteProduct = async (id) => {
    return await apiRequest (`/product/${id}`, {
        method: 'DELETE'
    })
}