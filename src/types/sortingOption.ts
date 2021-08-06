export enum SortingNames {
    PRICE = "price",
    CREATED = "what's new",
    NAME = "name"
}

export interface SortingOption {
    name: SortingNames;
    ascending: boolean;
}

export interface SortingOptionState {
    availableOptions: SortingOption[];
    activeOption: SortingOption | null;
}

export enum SortingActionTypes {
    SET_AVAILABLE_OPTIONS = "SET_AVAILABLE_OPTIONS",
    SET_ACTIVE_OPTION = "SET_ACTIVE_OPTION"
}

interface SetAvailableSortingOptionsAction {
    type: SortingActionTypes.SET_AVAILABLE_OPTIONS;
    payload: SortingOption[];
}

interface SetActiveSortingOptionAction {
    type: SortingActionTypes.SET_ACTIVE_OPTION;
    payload: SortingOption;
}

export type SortingOptionAction = SetActiveSortingOptionAction | SetAvailableSortingOptionsAction;

// action-wrappers
export function setAvailableSortingOptionsAction(sortingOptions: SortingOption[]): SetAvailableSortingOptionsAction {
    return {
        type: SortingActionTypes.SET_AVAILABLE_OPTIONS,
        payload: sortingOptions
    };
}

export function setActiveSortingOptionAction(sortingOption: SortingOption): SetActiveSortingOptionAction {
    return {
        type: SortingActionTypes.SET_ACTIVE_OPTION,
        payload: sortingOption
    }
}