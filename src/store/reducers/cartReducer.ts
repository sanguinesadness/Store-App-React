import { Product } from "@chec/commerce.js/types/product";
import { CartAction, CartActionTypes, CartProduct, CartState } from "../../types/cart";

const initialState: CartState = {
    cartProducts: []
};

export const cartReducer = (state = initialState, action: CartAction): CartState => {
    let cartProduct: CartProduct | undefined;

    switch (action.type) {
        case CartActionTypes.ADD_TO_CART:
            cartProduct = state.cartProducts.find(cp => cp.product.id === action.payload.product.id);

            // if CartProduct with given Id exists
            if (cartProduct) {
                // increase quantity of CartProduct by given value
                return {
                    ...state,
                    cartProducts: state.cartProducts.map((cp) => 
                        cp.product.id === action.payload.product.id ?
                        {...cp, quantity: cp.quantity + action.payload.quantity}
                        : cp
                    )
                }
            }
            else {
                // add CartProduct in Cart
                return {...state, cartProducts: [ ...state.cartProducts, action.payload ]};
            }
        case CartActionTypes.REMOVE_FROM_CART:
            cartProduct = state.cartProducts.find(cp => cp.product.id === action.payload.productId);

            if (cartProduct) {
                // if CartProduct with given Id exists
                if (cartProduct.quantity - action.payload.quantity <= 0) {
                    // remove CartProduct from Cart
                    return {...state, cartProducts: state.cartProducts.filter(cp => cp.product.id !== cartProduct?.product.id)}
                }
                else {
                    // decrease quantity of CartProduct by given value
                    return {
                        ...state, 
                        cartProducts: state.cartProducts.map((cp) => 
                            cp.product.id === action.payload.productId ?
                            {...cp, quantity: cp.quantity - action.payload.quantity}
                            : cp
                        )
                    }
                }
            }
            else {
                return state;
            }
        case CartActionTypes.CLEAR_CART:
            return {...state, cartProducts: []};
        default:
            return state;
    }
}