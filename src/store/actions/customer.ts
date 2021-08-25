import { Dispatch } from "react";
import { commerce } from "../../lib/commerce";
import { CustomerAction, fetchCustomerAction, fetchCustomerSuccessAction, fetchCustomerErrorAction, clearStateAction } from "../../types/customer"

export const fetchCustomer = (token: string | null) => {
    return async (dispatch: Dispatch<CustomerAction>) => {
        if (!token) {
            fetchCustomerErrorAction("Invalid or outdated token");
            return;
        }

        dispatch(fetchCustomerAction());

        if (commerce.customer.isLoggedIn()) {
            dispatch(fetchCustomerErrorAction("You are already Logged in"));
            return;
        }

        commerce.customer.getToken(token)
                        .then(response => {
                            commerce.customer.about()
                                            .then(customer => dispatch(fetchCustomerSuccessAction(customer, response.jwt)))                   
                                            .catch(() => dispatch(fetchCustomerErrorAction("Unknown error occured")))})
                        .catch(() => dispatch(fetchCustomerErrorAction("Invalid or outdated token")));
    }
}

export const refreshCurrentCustomer = () => {
    return async (dispatch: Dispatch<CustomerAction>) => {
        if (commerce.customer.isLoggedIn()) {
            dispatch(fetchCustomerAction());

            commerce.customer.about().then(customer => {
                dispatch(fetchCustomerSuccessAction(customer));
            })
            .catch(() => dispatch(clearStateAction()));
        }
        else {
            dispatch(clearStateAction());
        }
    }
}