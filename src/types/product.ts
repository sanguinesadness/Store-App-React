import { Product } from '@chec/commerce.js/types/product'

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export enum ProductActionTypes {
    FETCH_PRODUCTS = "FETCH_PRODUCTS",
    FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
    FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR"
}

interface FetchProductsAction {
    type: ProductActionTypes.FETCH_PRODUCTS;
}

interface FetchProductsSuccessAction {
    type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS;
    payload: Product[];
}

interface FetchProductsErrorAction {
    type: ProductActionTypes.FETCH_PRODUCTS_ERROR;
    payload: string;
}

export type ProductAction = FetchProductsAction | FetchProductsErrorAction | FetchProductsSuccessAction;

// action-wrappers
export function fetchProductsAction(): FetchProductsAction {
    return { type: ProductActionTypes.FETCH_PRODUCTS }
}

export function fetchProductsSuccessAction(products: Product[]): FetchProductsSuccessAction {
    return { type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS, payload: products }
}

export function fetchProductsErrorAction(error: string): FetchProductsErrorAction {
    return { type: ProductActionTypes.FETCH_PRODUCTS_ERROR, payload: error }
}