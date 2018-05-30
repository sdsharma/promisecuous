import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, UserState } from '../store/state';
import { AppActions } from '../store/actions/appActions';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  loggedIn: boolean = false;
  loginFail: boolean = false;

  constructor(private store: Store<AppState>, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.store.select((state: AppState) => {
        return state.user;
    }).subscribe((user: UserState) => {
        this.loggedIn = user.loggedIn;
        this.loginFail = user.loginFail;
        if (this.loggedIn) {
          this.router.navigate(['/home']);
        }
    });
  }

  login(): void {
    if (this.model.valid) {
      this.store.dispatch({type: AppActions.LOGIN, payload: this.model.value});
    }
  }

  loginGoogle(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((credentials) => {
      this.store.dispatch({type: AppActions.LOGGED_IN, payload: credentials.user});
    }).catch((error) => {
      this.store.dispatch({type: AppActions.LOGIN_FAILED});
    });
  }
}
