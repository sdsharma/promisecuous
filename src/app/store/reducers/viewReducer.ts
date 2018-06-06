import { Action } from "@ngrx/store";
import { ViewState, INITIAL_VIEW_STATE } from '../state';
import { AppActions } from "../actions/appActions";

export function ViewReducer(state: ViewState = INITIAL_VIEW_STATE, action: Action) {
    // clones object for modification and return
    const newState: ViewState = Object.assign({}, state);
    switch (action.type) {
        case AppActions.SUCCESSFUL_POST:
          return newState;
        case AppActions.RECEIVED_TIMELINE_POSTS:
          newState.timelinePosts = action.payload;
          return newState;
        case AppActions.RECEIVED_NEW_FRIENDS:
          newState.newFriends = action.payload;
          return newState;
        default:
            return state;
    }
};
