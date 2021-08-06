export interface ScrollState {
    percent: number;
}

export enum ScrollActionTypes {
    SET_SCROLL_PERCENT = "SET_SCROLL_PERCENT"
}

interface SetScrollPercent {
    type: ScrollActionTypes.SET_SCROLL_PERCENT;
    payload: number;
}

export type ScrollAction = SetScrollPercent;

// action-wrappers
export function setScrollPercentAction(percent: number): SetScrollPercent {
    return { type: ScrollActionTypes.SET_SCROLL_PERCENT, payload: percent }
}