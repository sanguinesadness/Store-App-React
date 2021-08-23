import { Dispatch } from "react";
import { commerce } from "../../lib/commerce";
import { CategoryAction, fetchCategoriesAction, fetchCategoriesErrorAction, fetchCategoriesSuccessAction } from "../../types/category";

export const fetchCategories = () => {
    return async (dispatch: Dispatch<CategoryAction>) => {
        try {
            dispatch(fetchCategoriesAction());
    
            const response = await commerce.categories.list();
    
            dispatch(fetchCategoriesSuccessAction(response.data));
        }
        catch (error) {
            dispatch(fetchCategoriesErrorAction(error));
        }
    }
}