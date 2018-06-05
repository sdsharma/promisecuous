import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { AppActions } from '../store/actions/appActions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: FirebaseListObservable<any[]>;
  userData: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select((state: AppState) => {
      return state;
    }).subscribe((state: AppState) => {
      this.posts = state.view.timelinePosts;
      this.userData = state.user.userData;
    });

    this.store.dispatch({type: AppActions.GET_TIMELINE_POSTS, payload: this.userData.uid});
  }
}
