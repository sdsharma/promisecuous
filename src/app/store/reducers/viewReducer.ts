import { Action } from "@ngrx/store";
import { ViewState, INITIAL_VIEW_STATE } from '../state';
import { AppActions } from "../actions/appActions";

export function ViewReducer(state: ViewState = INITIAL_VIEW_STATE, action: Action) {
    // clones object for modification and return
    const newState: ViewState = Object.assign({}, state);
    switch (action.type) {
        case AppActions.SET_SUB_ROUTE:
          newState.subroute = action.payload;
          return newState;
        case AppActions.SUCCESSFUL_POST:
          return state;
        case AppActions.RECEIVED_TIMELINE_POSTS:
          newState.timelinePosts = action.payload;
          return newState;
        default:
            return state;
    }
};
