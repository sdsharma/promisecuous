import { AppState, INITIAL_APP_STATE } from '../../store/state';
import { combineReducers, ActionReducer } from "@ngrx/store";
import { UserReducer } from '../../store/reducers/userReducer';
import { ViewReducer } from '../../store/reducers/viewReducer';
import { DataReducer } from '../../store/reducers/dataReducer';

const reducers = {
  user: UserReducer,
  view: ViewReducer,
  data: DataReducer
};

const combinedReducers: ActionReducer<AppState> = combineReducers(reducers);

export function appReducers(state: AppState = INITIAL_APP_STATE, action: any) {
  return combinedReducers(state, action);
}
