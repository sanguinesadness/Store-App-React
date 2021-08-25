import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { categoryReducer } from "./categoryReducer";
import { scrollReducer } from "./scrollReducer";
import { localCartReducer } from "./localCartReducer";
import { wishListReducer } from "./wishListReducer";
import { sortingReducer } from "./sortingOptionReducer";
import { loadingReducer } from "./loadingReducer";
import { commerceCartReducer } from "./commerceCartReducer";
import { customerReducer } from "./customerReducer";

export const rootReducer = combineReducers({
    product: productReducer,
    category: categoryReducer,
    scroll: scrollReducer,
    localCart: localCartReducer,
    commerceCart: commerceCartReducer,
    wishList: wishListReducer,
    sorting: sortingReducer,
    loading: loadingReducer,
    customer: customerReducer
});

export type RootState = ReturnType<typeof rootReducer>;