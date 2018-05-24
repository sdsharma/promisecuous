import { Effect, Actions, toPayload } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import 'rxjs/observable/of';
import { Http } from "@angular/http";
import { AppActions } from "../actions/appActions";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AppEffects {

    @Effect() login$ = this.action$
        .ofType(AppActions.LOGIN)
        .map(toPayload)
        .switchMap(payload => {
            return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(payload.email, payload.password))
            .catch(err => {
                return Observable.of({ type: AppActions.LOGIN_FAILED });
            })
            .switchMap(credentials => {
              if (credentials.type && credentials.type === AppActions.LOGIN_FAILED) {
                return Observable.of({ type: AppActions.LOGIN_FAILED });
              }
              return Observable.of({
                type: AppActions.LOGGED_IN,
                payload: credentials
              });
           });
        });

    @Effect() newpublictextpost$ = this.action$
        .ofType(AppActions.NEW_PUBLIC_TEXT_POST)
        .map(toPayload)
        .switchMap(payload => {
            let posts = this.db.list('/posts/' + payload.uid);
            posts.push({
              type: 'text',
              timestamp: Date.now(),
              content: payload.content
            });
            return Observable.of({
                type: AppActions.SUCCESSFUL_POST,
                payload: null
            });
        });

    constructor(private action$: Actions, private _http: Http, private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

}
