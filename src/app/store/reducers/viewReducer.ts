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
        case AppActions.LIKE_TIMELINE_POST:
          let containedIndex = action.payload.post.likes.indexOf(action.payload.uid);
          if (containedIndex > -1) {
            action.payload.post.likes.splice(containedIndex, 1);
          } else {
            action.payload.post.likes.push(action.payload.uid);
          }
          state.timelinePosts.update(action.payload.post.$key, {likes: action.payload.post.likes});
          return newState;
        case AppActions.POST_COMMENT:
          action.payload.post.comments.push({timestamp: Date.now(), content: action.payload.comment, uid: action.payload.uid});
          state.timelinePosts.update(action.payload.post.$key, {comments: action.payload.post.comments});
          return newState;
        default:
            return state;
    }
};
