import { CategoryState, CategoryActionTypes, CategoryAction } from '../../types/category';

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
    selectedCategory: null
}

export const categoryReducer = (state = initialState, action: CategoryAction): CategoryState => {
    switch (action.type) {
        case CategoryActionTypes.FETCH_CATEGORIES:
            return { categories: [], loading: true, error: null };
        case CategoryActionTypes.FETCH_CATEGORIES_ERROR:
            return { categories: [], loading: false, error: action.payload };
        case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
            return { categories: action.payload, loading: false, error: null };
        case CategoryActionTypes.SET_SELECTED_CATEGORY:
            return { ...state, selectedCategory: action.payload };
        default:
            return state;
    }
}