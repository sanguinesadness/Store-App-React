import { SortingActionTypes, SortingOptionAction, SortingOptionState } from "../../types/sortingOption";

const initialState: SortingOptionState = {
    availableOptions: [],
    activeOption: null
}

export const sortingReducer = (state = initialState, action: SortingOptionAction): SortingOptionState => {
    switch (action.type) {
        case SortingActionTypes.SET_ACTIVE_OPTION:
            // set Active option ONLY if Available option list contains it
            if (state.availableOptions.find(option => option.name === action.payload.name))
                return { ...state, activeOption: action.payload };
            else
                return state;
        case SortingActionTypes.SET_AVAILABLE_OPTIONS:
            return { availableOptions: action.payload, activeOption: null };
        default:
            return state;
    }
}