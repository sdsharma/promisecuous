import { ActionReducer, Action } from "@ngrx/store";
import { UserState, INITIAL_USER_STATE } from '../state';
import { AppActions } from "../actions/appActions";

export function UserReducer(state: UserState = INITIAL_USER_STATE, action: Action) {
    // clones object for modification and return
    const newState: UserState = Object.assign({}, state);
    switch (action.type) {
       	case AppActions.LOGGED_IN:
       		newState.loggedIn = true;
          newState.loginFail = false;
          newState.userData = action.payload;
       		return newState;
       	case AppActions.LOGIN_FAILED:
       		newState.loggedIn = false;
          newState.loginFail = true;
          newState.userData = null;
       		return newState;
        case AppActions.LOGOUT:
          newState.loggedIn = false;
          newState.userData = null;
          return newState;
        default:
            return state;
    }
};