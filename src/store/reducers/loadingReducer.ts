import { LoadingAction, LoadingActionTypes, LoadingState } from "../../types/loading";

const initialState: LoadingState = {
    numOfLoadings: 0,
    loading: false
}

export const loadingReducer = (state = initialState, action: LoadingAction): LoadingState => {
    switch (action.type) {
        case LoadingActionTypes.SET_LOADINGS:
            if (action.payload < 0) {
                return { numOfLoadings: 0, loading: false };
            }
            else {
                return { numOfLoadings: action.payload, loading: action.payload > 0 };
            }
        case LoadingActionTypes.CLEAR_LOADINGS:
            return { numOfLoadings: 0, loading: false };
        case LoadingActionTypes.INC_LOADINGS: 
            return { numOfLoadings: state.numOfLoadings + 1, loading: true };
        case LoadingActionTypes.DEC_LOADINGS:
            if (state.numOfLoadings === 0) {
                return state;
            }
            else {
                return { numOfLoadings: state.numOfLoadings - 1, loading: state.numOfLoadings > 1 };
            }
        default:
            return state;
    }
}