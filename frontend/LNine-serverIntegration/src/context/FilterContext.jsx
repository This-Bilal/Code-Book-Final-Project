import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducers";

const filterInitialState = {
    productList: [],
    sortBy: null,
    onlyInStock: false,
    bestSellerOnly: false,
    ratings: null,
};

const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(filterReducer, filterInitialState);

    const initialProductList = (products) => {
        dispatch({
            type: "PRODUCT_LIST",
            payload: {
                products: products
            }
        })
    }

    const bestSeller = (products) => {
        return state.bestSellerOnly? products.filter(product => product.best_seller === true) : products
    }

    const sort = (products) => {
        if (state.sortBy === "lowtohigh") {
            return products.sort((a,b) => Number(a.price) - Number(b.price))
        }

        if (state.sortBy === "hightolow") {
            return products.sort((a,b) => Number(b.price) - Number(a.price))
        }

        return products
    }

    const inStock = (products) => {
        return state.onlyInStock ? products.filter(product => product.in_stock === true) : products
    }

    const ratings = (products) => {
        if (state.ratings === "4STARSABOVE") {
            return products.filter(product => product.rating >= 4)
        }

        if (state.ratings === "3STARSABOVE") {
            return products.filter(product => product.rating >= 3)
        }

        if (state.ratings === "2STARSABOVE") {
            return products.filter(product => product.rating >= 2)
        }

        if (state.ratings === "1STARSABOVE") {
            return products.filter(product => product.rating >= 1)
        }

        return products
    }

    const filteredProducts = ratings(sort(inStock(bestSeller(state.productList))))

    const value = {
        state,
        dispatch,
        products: filteredProducts,
        initialProductList
    }

    return <FilterContext.Provider value={value}>
        {children}
    </FilterContext.Provider>
}

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter must be used within FilterProvider");
    }
    return context;
}