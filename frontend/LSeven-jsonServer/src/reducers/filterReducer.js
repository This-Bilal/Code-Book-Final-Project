export const filterReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case "LOAD_PRODUCTS":
            return {...state, productList: payload};

        case "SORT_BY":
            return {...state, sortBy: payload};

        case "FILTER_BY_RATINGS":
            return {...state, ratings: payload};

        case "FILTER_BY_BEST_SELLER":
            return {...state, bestSellerOnly: payload};

        case "FILTER_BY_STOCK":
            return {...state, onlyInStock: payload};

        case "CLEAR_FILTERS":
            return {
                ...state,
                onlyInStock: false,
                bestSellerOnly: false,
                sortBy: "",
                ratings: []
            };

        default:
            return state;
    }
}