import { useCallback, useMemo, useState } from "react";

const useFilter = () => {
    const [productList, setProductList] = useState([])
    const [onlyInStock, setOnlyInStock] = useState(false)
    const [bestSellerOnly, setBestSellerOnly] = useState(false)
    const [sortBy, setSortBy] = useState(null)
    const [ratings, setRatings] = useState(null)

    const filteredProducts = useMemo(() => {
        let filtered = [...productList]

        // filter by best seller
        if (bestSellerOnly) {
            filtered = filtered.filter(p => p.best_seller === true)
        }

        // filter by in stock
        if (onlyInStock) {
            filtered = filtered.filter(p => p.in_stock === true)
        }

        // filter by ratings
        if (ratings) {
            const ratingsValue = parseInt(ratings.replace('STARSABOVE', ''))
            filtered = filtered.filter(p => p.rating >= ratingsValue)
        }

        if (sortBy === 'lowtohigh') {
            filtered.sort((a, b) => Number(a.price) - Number(b.price))
        } else if (sortBy === 'hightolow') {
            filtered.sort((a, b) => Number(b.price) - Number(a.price))
        }

        return filtered;
    }, [onlyInStock, bestSellerOnly, sortBy, ratings, productList]);

    const clearFilters = useCallback(() => {
        setOnlyInStock(false)
        setBestSellerOnly(false)
        setSortBy(null)
        setRatings(null)
    }, [])
  return {
    productList,
    filteredProducts,
    setProductList,
    onlyInStock,
    setOnlyInStock,
    bestSellerOnly,
    setBestSellerOnly,
    sortBy,
    setSortBy,
    ratings,
    setRatings,
    clearFilters
  }
}

export default useFilter