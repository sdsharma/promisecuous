import { Component, OnInit } from '@angular/core';
  import { Store } from '@ngrx/store';
  import { AppState } from '../store/state';
  import { AppActions } from '../store/actions/appActions';
  import { Router } from '@angular/router';
  import { FirebaseListObservable } from 'angularfire2/database';
  import { AngularFireAuth } from 'angularfire2/auth';
  
  @Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss']
  })
  export class FriendsComponent implements OnInit {
  
  
    users: FirebaseListObservable<any[]>;
    userData: any;
  
    constructor(private store: Store<AppState>, private router: Router, private afAuth: AngularFireAuth) { }
  
    ngOnInit(): void {
      this.store.select((state: AppState) => {
        return state;
      }).subscribe((state: AppState) => {
        this.users = state.view.newFriends;
        this.userData = state.user.userData;
      });

      this.store.dispatch({type: AppActions.GET_NEW_FRIENDS});
    }
  
  }
  
