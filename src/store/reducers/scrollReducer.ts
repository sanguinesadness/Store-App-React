import { ScrollAction, ScrollActionTypes, ScrollState } from "../../types/scroll";

const initialState: ScrollState = {
    percent: 0
}

export const scrollReducer = (state = initialState, action: ScrollAction): ScrollState => {
    switch (action.type) {
        case ScrollActionTypes.SET_SCROLL_PERCENT:
            return { percent: action.payload };
        default: 
            return state;
    }
}