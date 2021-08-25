import { CustomerState, CustomerAction, CustomerActionTypes } from "../../types/customer";

const initialState: CustomerState = {
    login: { loading: false }
}

export const customerReducer = (state = initialState, action: CustomerAction): CustomerState => {
    switch (action.type) {
        case CustomerActionTypes.FETCH_CUSTOMER:
            return { ...state, login: { loading: true } };
        case CustomerActionTypes.FETCH_CUSTOMER_SUCCESS:
            return { 
                customer: action.payload.customer, 
                jwt: action.payload.jwt,
                login: { loading: false }
            };
        case CustomerActionTypes.FETCH_CUSTOMER_ERROR:
            return { ...state, login: { loading: false, error: action.payload } };
        case CustomerActionTypes.CLEAR_STATE:
            return initialState;
        default:
            return state;
    }
}