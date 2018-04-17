import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, ViewState} from '../store/state';
import { AppActions } from '../store/actions/appActions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  subroute: string;

  ngOnInit():void {
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