import { WishListState, WishListAction, WishListActionTypes } from "../../types/wishList"

const initialState: WishListState = {
    products: []
}

export const wishListReducer = (state = initialState, action: WishListAction): WishListState => {
    switch (action.type) {
        case WishListActionTypes.ADD_TO_WISHLIST:
            if (state.products.find(p => p.id === action.payload.id)) {
                return state;
            }
            else {
                return {...state, products: [ ...state.products, action.payload ]};
            }
        case WishListActionTypes.REMOVE_FROM_WISHLIST:
            return {...state, products: state.products.filter(p => p.id !== action.payload)};
        case WishListActionTypes.CLEAR_WISH_LIST:
            return {...state, products: []};
        default:
            return state;
    }
}