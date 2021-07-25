import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { categoryReducer } from "./categoryReducer";

export const rootReducer = combineReducers({
    product: productReducer,
    category: categoryReducer
});

export type RootState = ReturnType<typeof rootReducer>;