import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { AppActions } from '../../store/actions/appActions';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.store.dispatch({type: AppActions.LOGOUT, payload: null});
    this.router.navigate(['login']);
  }

  home(): void {
    this.router.navigate(['/admin/' + this.subroute]);
  }
}
