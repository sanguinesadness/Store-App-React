import { Dispatch } from "react";
import { commerce } from "../../lib/commerce";
import { ProductAction, fetchProductsSuccessAction, fetchProductsAction, fetchProductsErrorAction } from "../../types/product";

export const fetchProducts = () => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch(fetchProductsAction());
    
            const response = await commerce.products.list();
    
            dispatch(fetchProductsSuccessAction(response.data));
        }
        catch (error) {
            dispatch(fetchProductsErrorAction(error.message));
        }
    }
}