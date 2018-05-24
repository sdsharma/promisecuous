export interface UserState {
  loggedIn: boolean;
  loginFail: boolean;
  userData: null;
}

export const INITIAL_USER_STATE: UserState = {
  loggedIn: false,
  loginFail: false,
};

export interface ViewState {}

export const INITIAL_VIEW_STATE: ViewState = {};

export interface DataState {}

export const INITIAL_DATA_STATE: DataState = {};

export interface AppState {
  user: UserState;
  view: ViewState;
  data: DataState;
}

export const INITIAL_APP_STATE: AppState = {
   user: INITIAL_USER_STATE,
   view: INITIAL_VIEW_STATE,
   data: INITIAL_DATA_STATE
};
