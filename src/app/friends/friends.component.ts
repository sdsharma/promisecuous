import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { AppActions } from '../store/actions/appActions';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {


  users: FirebaseListObservable<any[]>;
  userData: any;
  userProfile: any = null;
  userCount: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select((state: AppState) => {
      return state;
    }).subscribe((state: AppState) => {
      this.users = state.view.newFriends;
      this.userData = state.user.userData;
      if (this.users && this.userData) {
        this.users.subscribe(users => {
          this.userCount = users.length - 1;
          this.userProfile = users.filter(user => user.$key === this.userData.uid)[0];
        });
      }
    });
    this.store.dispatch({type: AppActions.GET_NEW_FRIENDS});
  }

  addFriend(friend: any): void {
    this.store.dispatch({type: AppActions.ADD_FRIEND, payload: {
      uid: this.userData.uid,
      friend: friend,
      self: {
        displayName: this.userData.displayName,
        uid: this.userData.uid,
        email: this.userData.email,
        photoURL: this.userData.photoURL
      }
    }});
  }

  isAdded(uid: string): boolean {
    let result = false;
    if (this.userProfile.friends) {
      Object.keys(this.userProfile.friends).forEach((key) => {
        if (this.userProfile.friends[key].uid === uid) {
          result = true;
        }
      });
    }
    return result;
  }

  removeFriend(friend: any): void {
    let friendKey, selfKey;
    Object.keys(this.userProfile.friends).forEach((key) => {
      if (this.userProfile.friends[key].uid === friend.$key) {
        friendKey = key;
      }
    });
    Object.keys(friend.friends).forEach((key) => {
      if (friend.friends[key].uid === this.userData.uid) {
        selfKey = key;
      }
    });
    this.store.dispatch({type: AppActions.REMOVE_FRIEND, payload: {
      selfuid: this.userData.uid,
      frienduid: friend.$key,
      friendKey: friendKey,
      selfKey: selfKey
    }});
  }
}
