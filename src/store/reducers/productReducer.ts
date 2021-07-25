import { ProductState, ProductActionTypes, ProductAction } from '../../types/product';

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
}

export const productReducer = (state = initialState, action: ProductAction): ProductState => {
    switch (action.type) {
        case ProductActionTypes.FETCH_PRODUCTS:
            return { products: [], loading: true, error: null };
        case ProductActionTypes.FETCH_PRODUCTS_ERROR:
            return { products: [], loading: false, error: action.payload };
        case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
            return { products: action.payload, loading: false, error: null };
        default:
            return state;
    }
}