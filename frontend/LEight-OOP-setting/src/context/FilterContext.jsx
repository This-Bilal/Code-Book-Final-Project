import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { filterReducer } from "../reducers";

const filterInitialState = {
    productList: [],
    sortBy: "",
    onlyInStock: false,
    bestSellerOnly: false,
    ratings: [],
};

const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(filterReducer, filterInitialState);

    const setProductList = useCallback((products) => {
        dispatch({
            type: "LOAD_PRODUCTS",
            payload: products
        });
    }, []);

    const setSortBy = useCallback((sort) => {
        dispatch({
            type: "SORT_BY",
            payload: sort
        });
    }, []);

    const setOnlyInStock = useCallback((value) => {
        dispatch({
            type: "FILTER_BY_STOCK",
            payload: value
        });
    }, []);

    const setBestSellerOnly = useCallback((value) => {
        dispatch({
            type: "FILTER_BY_BEST_SELLER",
            payload: value
        });
    }, []);

    const setRatings = useCallback((ratings) => {
        dispatch({
            type: "FILTER_BY_RATINGS",
            payload: ratings
        });
    }, []);

    const clearFilters = useCallback(() => {
        dispatch({
            type: "CLEAR_FILTERS"
        });
    }, []);

    const filteredProducts = useMemo(() => {
        let filtered = [...state.productList];

        if (state.bestSellerOnly) {
            filtered = filtered.filter(p => p.best_seller === true);
        }

        if (state.onlyInStock) {
            filtered = filtered.filter(p => p.in_stock === true);
        }

        if (state.ratings && state.ratings.length > 0) {
            const ratingValue = parseInt(state.ratings.replace("STARSABOVE", ""));
            filtered = filtered.filter(p => p.rating >= ratingValue);
        }

        if (state.sortBy === "lowtohigh") {
            filtered.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (state.sortBy === "hightolow") {
            filtered.sort((a, b) => Number(b.price) - Number(a.price));
        }

        return filtered;
    }, [state.productList, state.onlyInStock, state.bestSellerOnly, state.sortBy, state.ratings]);

    const value = {
        productList: state.productList,
        setProductList,
        filteredProducts,
        sortBy: state.sortBy,
        setSortBy,
        onlyInStock: state.onlyInStock,
        setOnlyInStock,
        bestSellerOnly: state.bestSellerOnly,
        setBestSellerOnly,
        ratings: state.ratings,
        setRatings,
        clearFilters
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