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
import * as firebase from 'firebase';
import { generateUUID } from '../../shared/functions/uuid';

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
            let posts = this.db.list(payload.uid + '/posts/');
            posts.push({
              type: 'text',
              timestamp: Date.now(),
              content: payload.content,
              comments: [],
              likes: []
            });
            return Observable.of({
                type: AppActions.SUCCESSFUL_POST,
                payload: null
            });
        });

    @Effect() newpublicphotopost$ = this.action$
        .ofType(AppActions.NEW_PUBLIC_PHOTO_POST)
        .map(toPayload)
        .switchMap(payload => {
            let posts = this.db.list(payload.uid + '/posts/');
            posts.push({
              type: 'photo',
              timestamp: Date.now(),
              content: payload.content.resized && payload.content.resized.dataURL || payload.content.dataURL,
              comments: [],
              likes: []
            }).then(post => {
              this.pushFileToStorage(payload.content.file, post);
            });
            return Observable.of({
                type: AppActions.SUCCESSFUL_POST,
                payload: null
            });
        });

    @Effect() gettimelineposts$ = this.action$
        .ofType(AppActions.GET_TIMELINE_POSTS)
        .map(toPayload)
        .switchMap(payload => {
            let posts = this.db.list(payload + '/posts/', {query: {orderByChild: 'timestamp'}});
            return Observable.of({
                type: AppActions.RECEIVED_TIMELINE_POSTS,
                payload: posts
            });
        });


    constructor(private action$: Actions, private _http: Http, private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

    pushFileToStorage(file: File, post: any): string {
      console.log(post);
      const storageRef = firebase.storage().ref();
      const uuid = generateUUID();
      const uploadTask = storageRef.child(uuid + "_"  + file.name).put(file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => { },
        (error) => {
          console.log(error);
        },
        () => {
          post.update({content: uploadTask.snapshot.downloadURL});
        }
      );
    }

}
