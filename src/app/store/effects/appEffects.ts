import { Effect, Actions, toPayload } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/of'; 
import { Http, Response, Headers } from "@angular/http";
import { AppActions } from "../actions/appActions"
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AppEffects {

    constructor(private action$: Actions, private _http: Http, private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    }

    @Effect() login$ = this.action$
        .ofType(AppActions.LOGIN)
        .map(toPayload)
        .switchMap(payload => {
            return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(payload.email, payload.password))
            .catch(err => {
                return Observable.of({ type: AppActions.LOGIN_FAILED });
            })
            .switchMap(credentials => {
              if(credentials.type && credentials.type == AppActions.LOGIN_FAILED){
                return Observable.of({ type: AppActions.LOGIN_FAILED });
              }
              return Observable.of({
                type: AppActions.LOGGED_IN,
                payload: credentials
              });
           });
        });
        
       

    private prepareRequest(payload: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let content = JSON.stringify(payload);
        return {
            headers: headers,
            content: content
        };
    }

    private prepareGetRequestParams(url: string, payload: any[]) {
        let keys = Object.keys(payload);
        let params = "?";
        keys.forEach(key => {
            params += key + "=" + payload[key] + "&";
        });
        if(params == "?"){
            return url;
        }
        return url + params.slice(0,-1);
    }

    private extractData(resp: Response): any {
        let body = resp.json();
        return body.result || null;
    }

    private handleError(error: Response | any): any {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}