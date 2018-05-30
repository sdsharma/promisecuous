import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { AppActions } from '../store/actions/appActions';
import { Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subroute: string;
  posts: FirebaseListObservable<any[]>;
  userData: any;

  constructor(private store: Store<AppState>, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.store.select((state: AppState) => {
      return state;
    }).subscribe((state: AppState) => {
      this.subroute = state.view.subroute;
      this.posts = state.view.timelinePosts;
      this.userData = state.user.userData;
    });

    this.store.dispatch({type: AppActions.GET_TIMELINE_POSTS, payload: this.userData.uid});
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.store.dispatch({type: AppActions.LOGOUT, payload: null});
    this.router.navigate(['login']);
  }

  changeCategory(category: string): void {
    this.store.dispatch({type: AppActions.SET_SUB_ROUTE, payload: category});
  }
}
