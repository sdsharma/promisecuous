import { ViewReducer } from './viewReducer';
import { AppActions } from "../actions/appActions";

describe('ViewReducer', () => {
  it('should successfully post', () => {
    let initalState = {
        timelinePosts: null,
        newFriends: null,
        openedComments: []
    };
    let action = {
        type: AppActions.SUCCESSFUL_POST,
        payload: null
    };
    let newState = ViewReducer(initalState, action);
    expect(newState).toEqual(initalState);
  });

  it('should recieve timeline posts', () => {
    let initalState = {
        timelinePosts: null,
        newFriends: null,
        openedComments: []
    };
    let action = {
        type: AppActions.RECEIVED_TIMELINE_POSTS,
        payload: 'hello'
    };
    let newState = ViewReducer(initalState, action);
    expect(newState.timelinePosts).toEqual('hello');
  });

  it('should recieve new friends', () => {
    let initalState = {
        timelinePosts: null,
        newFriends: null,
        openedComments: []
    };
    let action = {
        type: AppActions.RECEIVED_NEW_FRIENDS,
        payload: null
    };
    let newState = ViewReducer(initalState, action);
    expect(newState.newFriends).toBeFalsy();
  });

  it('should open posts', () => {
    let initalState = {
        timelinePosts: null,
        newFriends: null,
        openedComments: []
    };
    let action = {
        type: AppActions.OPEN_POST,
        payload: 'hello'
    };
    let newState = ViewReducer(initalState, action);
    expect(newState.openedComments[0]).toEqual('hello');
  });

  it('should close posts', () => {
    let initalState = {
        timelinePosts: null,
        newFriends: null,
        openedComments: ['hello']
    };
    let action = {
        type: AppActions.CLOSE_POST,
        payload: 'hello'
    };
    let newState = ViewReducer(initalState, action);
    expect(newState.openedComments.length).toEqual(0);
  });
});
