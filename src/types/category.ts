import { Category } from '@chec/commerce.js/types/category';

export interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    selectedCategory?: Category | null;
}

export enum CategoryActionTypes {
    FETCH_CATEGORIES = "FETCH_CATEGORIES",
    FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS",
    FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR",
    SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY"
}

interface FetchCategoriesAction {
    type: CategoryActionTypes.FETCH_CATEGORIES;
}

interface FetchCategoriesSuccessAction {
    type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS;
    payload: Category[];
}

interface FetchCategoriesErrorAction {
    type: CategoryActionTypes.FETCH_CATEGORIES_ERROR;
    payload: string;
}

interface SetSelectedCategoryAction {
    type: CategoryActionTypes.SET_SELECTED_CATEGORY;
    payload: Category;
}

export type CategoryAction = FetchCategoriesAction 
                            | FetchCategoriesErrorAction
                            | FetchCategoriesSuccessAction
                            | SetSelectedCategoryAction;

// action-wrappers
export function fetchCategoriesAction(): FetchCategoriesAction {
    return { type: CategoryActionTypes.FETCH_CATEGORIES }
}

export function fetchCategoriesSuccessAction(categories: Category[]): FetchCategoriesSuccessAction {
    return { type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS, payload: categories }
}

export function fetchCategoriesErrorAction(error: string): FetchCategoriesErrorAction {
    return { type: CategoryActionTypes.FETCH_CATEGORIES_ERROR, payload: error }
}

export function setSelectedCategoryAction(category: Category): SetSelectedCategoryAction {
    return { type: CategoryActionTypes.SET_SELECTED_CATEGORY, payload: category }
}