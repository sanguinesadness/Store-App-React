import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { categoryReducer } from "./categoryReducer";
import { scrollReducer } from "./scrollReducer";
import { cartReducer } from "./cartReducer";
import { wishListReducer } from "./wishListReducer";
import { sortingReducer } from "./sortingOptionReducer";

export const rootReducer = combineReducers({
    product: productReducer,
    category: categoryReducer,
    scroll: scrollReducer,
    cart: cartReducer,
    wishList: wishListReducer,
    sorting: sortingReducer
});

export type RootState = ReturnType<typeof rootReducer>;