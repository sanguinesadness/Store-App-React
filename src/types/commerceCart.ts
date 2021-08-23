import { LineItem } from '@chec/commerce.js/types/line-item';

export interface CommerceCartState {
    lineItems: LineItem[];
    loading: boolean;
    error: string | null;
}

export enum CommerceCartActionTypes {
    FETCH_CART = "FETCH_CART",
    FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS",
    FETCH_CART_ERROR = "FETCH_CART_ERROR"
}

interface FetchCartAction {
    type: CommerceCartActionTypes.FETCH_CART;
}

interface FetchCartSuccessAction {
    type: CommerceCartActionTypes.FETCH_CART_SUCCESS;
    payload: LineItem[];
}

interface FetchCartErrorAction {
    type: CommerceCartActionTypes.FETCH_CART_ERROR;
    payload: string;
}

export type CommerceCartAction = FetchCartAction | FetchCartSuccessAction | FetchCartErrorAction;

// action-wrappers
export function fetchCartAction(): FetchCartAction {
    return { type: CommerceCartActionTypes.FETCH_CART };
}

export function fetchCartSuccessAction(lineItems: LineItem[]): FetchCartSuccessAction {
    return {
        type: CommerceCartActionTypes.FETCH_CART_SUCCESS,
        payload: lineItems
    };
}

export function fetchCartErrorAction(error: string): FetchCartErrorAction {
    return {
        type: CommerceCartActionTypes.FETCH_CART_ERROR,
        payload: error
    };
}