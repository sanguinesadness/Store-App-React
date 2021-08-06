import { Product } from '@chec/commerce.js/types/product';

export interface WishListState {
    products: Product[];
}

export enum WishListActionTypes {
    ADD_TO_WISHLIST = "ADD_TO_WISHLIST",
    REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST",
    CLEAR_WISH_LIST = "REMOVE_WISH_LIST"
}

interface AddToWishlistAction {
    type: WishListActionTypes.ADD_TO_WISHLIST;
    payload: Product;
}

interface RemoveFromWishlistAction {
    type: WishListActionTypes.REMOVE_FROM_WISHLIST;
    payload: string;
}

interface ClearWishListAction {
    type: WishListActionTypes.CLEAR_WISH_LIST;
}

export type WishListAction = AddToWishlistAction | RemoveFromWishlistAction | ClearWishListAction;

// action-wrappers
export function addToWishlistAction(product: Product): AddToWishlistAction {
    return {
        type: WishListActionTypes.ADD_TO_WISHLIST,
        payload: product
    };
}

export function removeFromWishlistAction(productId: string): RemoveFromWishlistAction {
    return {
        type: WishListActionTypes.REMOVE_FROM_WISHLIST,
        payload: productId
    };
}

export function clearWishListAction(): ClearWishListAction {
    return { type: WishListActionTypes.CLEAR_WISH_LIST };
}