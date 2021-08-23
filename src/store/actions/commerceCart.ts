import { LineItem } from "@chec/commerce.js/types/line-item";
import { Product } from "@chec/commerce.js/types/product";
import { Dispatch } from "react";
import { commerce } from "../../lib/commerce";
import { CommerceCartAction, fetchCartAction, fetchCartErrorAction, fetchCartSuccessAction } from "../../types/commerceCart";
import { decLoadingsAction, incLoadingsAction, LoadingAction } from "../../types/loading";
import { fillLocalCartAction, LCartProduct, LocalCartAction } from "../../types/localCart";

export const fetchCommerceCart = () => {
    return async (dispatch: Dispatch<CommerceCartAction>) => {
        dispatch(fetchCartAction());

        commerce.cart.contents()
        .then(items => dispatch(fetchCartSuccessAction(items)))
        .catch(error => dispatch(fetchCartErrorAction(error)));
    }
}

export const clearCommerceCart = () => {
    return async (dispatch: Dispatch<LoadingAction>) => {
        dispatch(incLoadingsAction());

        commerce.cart.empty().then(response => {
            if (response.success) {
                dispatch(decLoadingsAction());
            }
        });
    }
}

export const addToCommerceCart = (product: Product, quantity: number) => {
    return async (dispatch: Dispatch<LoadingAction>) => {
        dispatch(incLoadingsAction());

        commerce.cart.contents().then(items => {
            const existingItem = items.find(item => item.product_id === product.id);

            if (existingItem) {
                commerce.cart.update(existingItem.id, { quantity: existingItem.quantity + quantity })
                    .then(response => {
                        if (response.success) {
                            dispatch(decLoadingsAction());
                        }
                    });
            }
            else {
                commerce.cart.add(product.id, quantity)
                    .then(response => {
                        if (response.success) {
                            dispatch(decLoadingsAction());
                        }
                    });;
            }
        });
    }
}

export const updateCommerceCart = (product: Product, quantity: number) => {
    return async (dispatch: Dispatch<LoadingAction>) => {
        dispatch(incLoadingsAction());

        commerce.cart.contents().then(items => {
            const existingItem = items.find(item => item.product_id === product.id);
    
            if (existingItem) {
                commerce.cart.update(existingItem.id, { quantity })
                    .then(response => {
                        if (response.success) {
                            dispatch(decLoadingsAction());
                        }
                    });
            }
        });
    }
}

export const removeFromCommerceCart = (product: Product) => {
    return async (dispatch: Dispatch<LoadingAction>) => {
        dispatch(incLoadingsAction());

        commerce.cart.contents().then(items => {
            const existingItem = items.find(item => item.product_id === product.id);
    
            if (existingItem) {
                commerce.cart.remove(existingItem.id)
                    .then(response => {
                        if (response.success) {
                            dispatch(decLoadingsAction());
                        }
                    });;
            }
        });
    }
}

export const commerceCartToLocal = (availableProducts: Product[], lineItems: LineItem[]) => {
    return async (dispatch: Dispatch<LocalCartAction>) => {
        let lCartProducts: LCartProduct[] = [];

        lineItems.forEach(item => {
            const product = availableProducts.find(p => p.id === item.product_id);
            if (product) {
                const lCartProduct: LCartProduct = {
                    product: product,
                    quantity: item.quantity,
                    price: product.price.raw * item.quantity
                }

                lCartProducts.push(lCartProduct);
            }
        });

        dispatch(fillLocalCartAction(lCartProducts));
    }
}

