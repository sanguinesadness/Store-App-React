export interface LoadingState {
    // number of active third-party loadings in the moment
    numOfLoadings: number;
    // shows is there any active loadings in the moment
    loading: boolean;
}

export enum LoadingActionTypes {
    SET_LOADINGS = "SET_NUM_OF_LOADINGS",
    INC_LOADINGS = "INC_LOADING",
    DEC_LOADINGS = "DEC_LOADING",
    CLEAR_LOADINGS = "CLEAR_LOADINGS"
}

interface SetLoadingsAction {
    type: LoadingActionTypes.SET_LOADINGS;
    payload: number;
}

interface IncLoadingsAction {
    type: LoadingActionTypes.INC_LOADINGS;
}

interface DecLoadingsAction {
    type: LoadingActionTypes.DEC_LOADINGS;
}

interface ClearLoadingsAction {
    type: LoadingActionTypes.CLEAR_LOADINGS;
}

export type LoadingAction = SetLoadingsAction | IncLoadingsAction | DecLoadingsAction | ClearLoadingsAction;

// action-wrappers
export const setLoadingsAction = (number: number): SetLoadingsAction => {
    return { type: LoadingActionTypes.SET_LOADINGS, payload: number };
}

export const incLoadingsAction = (): IncLoadingsAction => {
    return { type: LoadingActionTypes.INC_LOADINGS };
}

export const decLoadingsAction = (): DecLoadingsAction => {
    return { type: LoadingActionTypes.DEC_LOADINGS };
}

export const clearLoadingsAction = (): ClearLoadingsAction => {
    return { type: LoadingActionTypes.CLEAR_LOADINGS };
}