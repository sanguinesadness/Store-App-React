import { Product } from '@chec/commerce.js/types/product';

export interface LCartProduct {
    product: Product;
    quantity: number;
    price: number;
}

export interface LocalCartState {
    lcartProducts: LCartProduct[];
    totalPrice: number;
    totalQuantity: number;
}

export enum LocalCartActionTypes {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
    CLEAR_CART = "CLEAR_CART",
    FILL_CART = "FILL_CART"
}

interface AddToLocalCartAction {
    type: LocalCartActionTypes.ADD_TO_CART;
    payload: { product: Product, quantity: number };
}

interface RemoveFromLocalCartAction {
    type: LocalCartActionTypes.REMOVE_FROM_CART;
    payload: { productId: string, quantity: number };
}

interface ClearLocalCartAction {
    type: LocalCartActionTypes.CLEAR_CART;
}

interface FillLocalCartAction {
    type: LocalCartActionTypes.FILL_CART;
    payload: LCartProduct[];
}

export type LocalCartAction = AddToLocalCartAction | RemoveFromLocalCartAction | ClearLocalCartAction | FillLocalCartAction;

// action-wrappers
export function addToLocalCartAction(product: Product, quantity: number): AddToLocalCartAction {
    return {
        type: LocalCartActionTypes.ADD_TO_CART,
        payload: { product, quantity }
    };
}

export function removeFromLocalCartAction(productId: string, quantity: number): RemoveFromLocalCartAction {
    return {
        type: LocalCartActionTypes.REMOVE_FROM_CART,
        payload: { productId, quantity }
    };
}

export function clearLocalCartAction(): ClearLocalCartAction {
    return { type: LocalCartActionTypes.CLEAR_CART };
}

export function fillLocalCartAction(products: LCartProduct[]): FillLocalCartAction {
    return {
        type: LocalCartActionTypes.FILL_CART,
        payload: products
    };
}