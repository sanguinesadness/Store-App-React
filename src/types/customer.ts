import { Customer } from "@chec/commerce.js/types/customer";

export interface LoginState {
    loading: boolean;
    error?: string;
}

export interface CustomerState {
    customer?: Customer;
    jwt?: string;
    login: LoginState;
}

export enum CustomerActionTypes {
    FETCH_CUSTOMER = "FETCH_CUSTOMER",
    FETCH_CUSTOMER_SUCCESS = "FETCH_CUSTOMER_SUCCESS",
    FETCH_CUSTOMER_ERROR = "FETCH_CUSTOMER_ERROR",
    CLEAR_STATE = "CLEAR_STATE"
}

interface FetchCustomerAction {
    type: CustomerActionTypes.FETCH_CUSTOMER;
}

interface FetchCustomerSuccessAction {
    type: CustomerActionTypes.FETCH_CUSTOMER_SUCCESS;
    payload: {
        customer: Customer;
        jwt?: string;
    }
}

interface FetchCustomerErrorAction {
    type: CustomerActionTypes.FETCH_CUSTOMER_ERROR;
    payload: string;
}

interface ClearStateAction {
    type: CustomerActionTypes.CLEAR_STATE;
}

export type CustomerAction = FetchCustomerAction | FetchCustomerSuccessAction | FetchCustomerErrorAction | ClearStateAction;

// action-wrappers
export function fetchCustomerAction(): FetchCustomerAction {
    return { type: CustomerActionTypes.FETCH_CUSTOMER };
}

export function fetchCustomerSuccessAction(customer: Customer, jwt?: string): FetchCustomerSuccessAction {
    return { 
        type: CustomerActionTypes.FETCH_CUSTOMER_SUCCESS,
        payload: { customer, jwt }
    };
}

export function fetchCustomerErrorAction(error: string): FetchCustomerErrorAction {
    return {
        type: CustomerActionTypes.FETCH_CUSTOMER_ERROR,
        payload: error
    };
}

export function clearStateAction(): ClearStateAction {
    return { type: CustomerActionTypes.CLEAR_STATE };
}