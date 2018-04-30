import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, ViewState } from '../../store/state';
import { AppActions } from '../../store/actions/appActions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  subroute: string;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.select((state: AppState) => {
        return state.view;
    }).subscribe((view: ViewState) => {
      this.subroute = view.subroute;
    });
  }

  logout(): void {
    this.store.dispatch({type: AppActions.LOGOUT, payload: null});
    this.router.navigate(['login']);
  }

  home(): void {
    this.router.navigate(['/admin/' + this.subroute]);
  }
}
