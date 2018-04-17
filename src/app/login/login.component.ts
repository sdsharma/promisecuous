import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, UserState } from '../store/state';
import { AppActions } from '../store/actions/appActions';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  model: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  loggedIn: boolean = false;
  loginFail: boolean = false;

  ngOnInit():void {
  	this.store.select((state: AppState) => {
        return state.user;
    }).subscribe((user: UserState) => {
        this.loggedIn = user.loggedIn;
        this.loginFail = user.loginFail;
        if(this.loggedIn){
          this.router.navigate(['/admin']);
        }
    });
  }

  login():void {
  	if(this.model.valid) {
  		this.store.dispatch({type: AppActions.LOGIN, payload: this.model.value});
  	}
  }
}
