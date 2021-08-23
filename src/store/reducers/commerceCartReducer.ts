import { CommerceCartState, CommerceCartAction, CommerceCartActionTypes } from "../../types/commerceCart";

const initialState: CommerceCartState = {
    lineItems: [],
    loading: false,
    error: null
}

export const commerceCartReducer = (state = initialState, action: CommerceCartAction): CommerceCartState => {
    switch (action.type) {
        case CommerceCartActionTypes.FETCH_CART:
            return { lineItems: [], loading: true, error: null };
        case CommerceCartActionTypes.FETCH_CART_SUCCESS:
            return { lineItems: action.payload, loading: false, error: null };
        case CommerceCartActionTypes.FETCH_CART_ERROR:
            return { lineItems: [], loading: false, error: action.payload };
        default: 
            return state;
    }
}