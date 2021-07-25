import { Category } from "@chec/commerce.js/types/category";
import { Dispatch } from "react";
import { commerce } from "../../lib/commerce";
import { CategoryAction, fetchCategoriesAction, fetchCategoriesErrorAction, fetchCategoriesSuccessAction } from "../../types/category";

export const fetchCategories = async (dispatch: Dispatch<CategoryAction>) => {
    try {
        dispatch(fetchCategoriesAction());

        const response = await commerce.categories.list();

        dispatch(fetchCategoriesSuccessAction(response.data));
    }
    catch (error) {
        dispatch(fetchCategoriesErrorAction(error));
    }
}