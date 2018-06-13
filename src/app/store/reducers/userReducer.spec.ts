import { UserReducer } from './userReducer';
import { AppActions } from "../actions/appActions";

describe('UserReducer', () => {
  it('should log in paid', () => {
    let initalState = {
        loggedIn: false,
        loginFail: false,
        userData: {
            uid: ''
        },
        paid: false
    };
    let action = {
        type: AppActions.LOGGED_IN_PAID,
        payload: 'hello'
    };
    let newState = UserReducer(initalState, action);
    expect(newState.userData).toEqual('hello');
    expect(newState.paid).toBeTruthy();
    expect(newState.loggedIn).toBeTruthy();
    expect(newState.loginFail).toBeFalsy();
  });

  it('should log in unpaid', () => {
    let initalState = {
        loggedIn: false,
        loginFail: false,
        userData: {
            uid: ''
        },
        paid: false
    };
    let action = {
        type: AppActions.LOGGED_IN_UNPAID,
        payload: 'hello'
    };
    let newState = UserReducer(initalState, action);
    expect(newState.userData).toEqual('hello');
    expect(newState.paid).toBeFalsy();
    expect(newState.loggedIn).toBeTruthy();
    expect(newState.loginFail).toBeFalsy();
  });

  it('should fail login', () => {
    let initalState = {
        loggedIn: false,
        loginFail: false,
        userData: {
            uid: ''
        },
        paid: false
    };
    let action = {
        type: AppActions.LOGIN_FAILED,
        payload: null
    };
    let newState = UserReducer(initalState, action);
    expect(newState.userData).toBeFalsy();
    expect(newState.paid).toBeFalsy();
    expect(newState.loggedIn).toBeFalsy();
    expect(newState.loginFail).toBeTruthy();
  });

  it('should logout', () => {
    let initalState = {
        loggedIn: true,
        loginFail: false,
        userData: {
            uid: ''
        },
        paid: false
    };
    let action = {
        type: AppActions.LOGOUT,
        payload: null
    };
    let newState = UserReducer(initalState, action);
    expect(newState.userData).toBeFalsy();
    expect(newState.paid).toBeFalsy();
    expect(newState.loggedIn).toBeFalsy();
    expect(newState.loginFail).toBeFalsy();
  });
});
