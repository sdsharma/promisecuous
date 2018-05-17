import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, ViewState} from '../store/state';
import { AppActions } from '../store/actions/appActions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subroute: string;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.select((state: AppState) => {
      return state.view;
    }).subscribe((view: ViewState) => {
      this.subroute = view.subroute;
    });
  }

  changeCategory(category: string): void {
    this.store.dispatch({type: AppActions.SET_SUB_ROUTE, payload: category});
  }
}
