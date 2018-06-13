import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, UserState } from '../store/state';
import { AppActions } from '../store/actions/appActions';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  model: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  loggedIn: boolean = false;
  loginFail: boolean = false;
  paid: boolean = false;
  userData: any = null;
  paymentFail: boolean = false;

  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#000',
        lineHeight: '24px',
        fontWeight: 400,
        fontFamily: 'Metropolis, "Avenir Next", "Helvetica Neue", Arial, sans-serif',
        fontSize: '14px',
      }
    }
  };

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  constructor(private store: Store<AppState>, private router: Router, public zone: NgZone, private stripeService: StripeService) { }

  ngOnInit(): void {
    this.store.select((state: AppState) => {
        return state.user;
    }).subscribe((user: UserState) => {
        this.loggedIn = user.loggedIn;
        this.loginFail = user.loginFail;
        this.paid = user.paid;
        this.userData = user.userData;
        if (this.loggedIn && this.paid && this.router.url === '/login') {
          this.zone.run(() => {
            this.router.navigate(['/home']);
          });
        }
    });
  }

  login(): void {
    if (this.model.valid) {
      this.store.dispatch({type: AppActions.LOGIN, payload: this.model.value});
    }
  }

  loginGoogle(): void {
    this.store.dispatch({type: AppActions.LOGIN_GOOGLE});
  }

  pay(): void {
    let name = <string>this.userData.uid;
    this.stripeService
      .createToken(this.card.getCard(), { name } )
      .subscribe(result => {
        if (result.token) {
          this.store.dispatch({type: AppActions.USER_PAID, payload: this.userData});
        } else if (result.error) {
          this.paymentFail = true;
        }
      });
  }
}
