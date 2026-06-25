import apiRequest from "../config/api";

// export const getProduct = async () => {
//     return await apiRequest ('/products')
// }

export const getProduct = async (id) => {
    return await apiRequest (`/products/${id}`)
}

export const getProductByIds = async (ids) => {
    return await apiRequest (`/products?id=${ids.join('&id=')}`)
}

export const getProductsBestseller = async () => {
    return await apiRequest ('/products?best_seller=true')
}