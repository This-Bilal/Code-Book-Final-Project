import apiRequest from "../config/api";

export const getHome = async () => {
    return await apiRequest ('/featured_products')
}

export const getHomeSlider = async () => {
    return await apiRequest ('/products?best_seller=true')
}

export const getAllProducts = async () => {
    return await apiRequest ('/products')
}