import { Product } from "@chec/commerce.js/types/product";
import { LocalCartAction, LocalCartActionTypes, LCartProduct, LocalCartState } from "../../types/localCart";

const initialState: LocalCartState = {
    lcartProducts: [],
    totalPrice: 0,
    totalQuantity: 0
};

const calculateCartPrice = (cartProducts: LCartProduct[]) => {
    const price = cartProducts.reduce((a, b) => a + (b.price || 0), 0);
    return Math.round(price * 100) / 100;
};

const countItemsInCart = (cartProducts: LCartProduct[]) => (
    cartProducts.reduce((a, b) => a + (b.quantity || 0), 0)
);

const calculateProductPrice = (product: Product, quantity: number) => {
    const price = product.price.raw * quantity;
    return Math.round(price * 100) / 100;
};

export const localCartReducer = (state = initialState, action: LocalCartAction): LocalCartState => {
    let lCartProduct: LCartProduct | undefined;
    let newLCartProducts: LCartProduct[];

    switch (action.type) {
        case LocalCartActionTypes.ADD_TO_CART:
            lCartProduct = state.lcartProducts.find(cp => cp.product.id === action.payload.product.id);

            // if CartProduct with given Id exists
            if (lCartProduct) {
                // increase quantity of CartProduct by given value (and calculate new Totals)

                newLCartProducts = state.lcartProducts.map((cp) =>
                    cp.product.id === action.payload.product.id ? {
                        ...cp, quantity: cp.quantity + action.payload.quantity
                    }
                        : cp);

                newLCartProducts.forEach(cp => (
                    cp.price = calculateProductPrice(cp.product, cp.quantity)
                ));

                return {
                    ...state,
                        lcartProducts: newLCartProducts,
                        totalPrice: calculateCartPrice(newLCartProducts),
                        totalQuantity: countItemsInCart(newLCartProducts)
                }
            }
            else {
                // add CartProduct in Cart (and calculate price)

                newLCartProducts = [...state.lcartProducts, {
                    ...action.payload,
                    price: calculateProductPrice(action.payload.product, action.payload.quantity)
                }];

                return {
                    ...state,
                        lcartProducts: newLCartProducts,
                        totalPrice: calculateCartPrice(newLCartProducts),
                        totalQuantity: countItemsInCart(newLCartProducts)
                };
            }
        case LocalCartActionTypes.REMOVE_FROM_CART:
            lCartProduct = state.lcartProducts.find(cp => cp.product.id === action.payload.productId);

            if (lCartProduct) {
                // if CartProduct with given Id exists
                if (lCartProduct.quantity - action.payload.quantity <= 0) {
                    // remove CartProduct from Cart

                    newLCartProducts = state.lcartProducts.filter(cp => cp.product.id !== lCartProduct?.product.id);
                    
                    newLCartProducts.forEach(cp => (
                        cp.price = calculateProductPrice(cp.product, cp.quantity)
                    ));

                    return {...state, 
                        lcartProducts: newLCartProducts,
                        totalPrice: calculateCartPrice(newLCartProducts),
                        totalQuantity: countItemsInCart(newLCartProducts)
                    };
                }
                else {
                    // decrease quantity of CartProduct by given value (and calculate new Totals)

                    newLCartProducts = state.lcartProducts.map((cp) =>
                        cp.product.id === action.payload.productId ?
                            { ...cp, quantity: cp.quantity - action.payload.quantity }
                            : cp
                    );

                    newLCartProducts.forEach(cp => (
                        cp.price = calculateProductPrice(cp.product, cp.quantity)
                    ));

                    return {
                        ...state, 
                        lcartProducts: newLCartProducts,
                        totalPrice: calculateCartPrice(newLCartProducts),
                        totalQuantity: countItemsInCart(newLCartProducts)
                    };
                }
            }
            else {
                return state;
            }
        case LocalCartActionTypes.FILL_CART: 
            return { 
                lcartProducts: action.payload, 
                totalPrice: calculateCartPrice(action.payload), 
                totalQuantity: countItemsInCart(action.payload) 
            };
        case LocalCartActionTypes.CLEAR_CART:
            return {
                lcartProducts: [],
                totalPrice: 0,
                totalQuantity: 0 
            };
        default:
            return state;
    }
}