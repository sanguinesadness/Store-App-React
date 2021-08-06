import { Product } from '@chec/commerce.js/types/product';

export interface CartProduct {
    product: Product;
    quantity: number;
}

export interface CartState {
    cartProducts: CartProduct[];
}

export enum CartActionTypes {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
    CLEAR_CART = "CLEAR_CART"
}

interface AddToCartAction {
    type: CartActionTypes.ADD_TO_CART;
    payload: { product: Product, quantity: number };
}

interface RemoveFromCartAction {
    type: CartActionTypes.REMOVE_FROM_CART;
    payload: { productId: string, quantity: number };
}

interface ClearCartAction {
    type: CartActionTypes.CLEAR_CART;
}

export type CartAction = AddToCartAction | RemoveFromCartAction | ClearCartAction;

// action-wrappers
export function addToCartAction(product: Product, quantity: number): AddToCartAction {
    return {
        type: CartActionTypes.ADD_TO_CART,
        payload: { product, quantity }
    };
}

export function removeFromCartAction(productId: string, quantity: number): RemoveFromCartAction {
    return {
        type: CartActionTypes.REMOVE_FROM_CART,
        payload: { productId, quantity }
    };
}

export function clearCartAction(): ClearCartAction {
    return { type: CartActionTypes.CLEAR_CART }
}