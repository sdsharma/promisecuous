import { Action } from "@ngrx/store";
import { DataState, INITIAL_DATA_STATE } from '../state';

export function DataReducer(state: DataState = INITIAL_DATA_STATE, action: Action) {
    // clones object for modification and return
    const newState: DataState = Object.assign({}, state);
    switch (action.type) {
        default:
            return newState;
    }
};
