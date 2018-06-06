import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/of';
import { Http } from '@angular/http';
import { AppActions } from '../actions/appActions';
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
              type: AppActions.STORE_CREDENTIALS,
              payload: credentials
            });
         });
      });

  @Effect() logingoogle$ = this.action$
      .ofType(AppActions.LOGIN_GOOGLE)
      .map(toPayload)
      .switchMap(payload => {
          return Observable.fromPromise(this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
          .catch(err => {
              return Observable.of({ type: AppActions.LOGIN_FAILED });
          })
          .switchMap(credentials => {
            return Observable.of({
              type: AppActions.STORE_CREDENTIALS,
              payload: credentials.user
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
          let friends = [];
          let friendsPosts = [];
          let posts = this.db.list(payload + '/posts/', {query: {orderByChild: 'timestamp'}});
          let friendsList = this.db.list(payload + '/friends/').subscribe(result => {result.forEach(res => {friends.push(res.uid)})});
          friends.push(payload);
          friends.forEach(uid => {friendsPosts.push(this.db.list(uid + '/posts', {query: {orderByChild: 'timestamp'}}))});

          return Observable.of({
              type: AppActions.RECEIVED_TIMELINE_POSTS,
              payload: friendsPosts
          });
      });

    @Effect() getnewfriends$ = this.action$
    .ofType(AppActions.GET_NEW_FRIENDS)
    .map(toPayload)
    .switchMap(payload => {
        let newFriends = this.db.list('/');
        return Observable.of({
            type: AppActions.RECEIVED_NEW_FRIENDS,
            payload: newFriends
        });
    });

    @Effect() addfriend$ = this.action$
      .ofType(AppActions.ADD_FRIEND)
      .map(toPayload)
      .switchMap(payload => {
          let friends = this.db.list(payload.uid + '/friends/');
          if(payload.friend.posts){
            delete payload.friend.posts;
          }
          if(payload.friend.friends){
            delete payload.friend.friends;
          }
          payload.friend.uid = payload.friend.$key;
          friends.push(payload.friend);
          let friendsOfFriends = this.db.list(payload.friend.uid + '/friends/');
          friendsOfFriends.push(payload.self);
          return Observable.of({
              type: AppActions.SUCCESSFUL_POST,
              payload: null
          });
      });

  @Effect() removefriend$ = this.action$
      .ofType(AppActions.REMOVE_FRIEND)
      .map(toPayload)
      .switchMap(payload => {
          let friends = this.db.list(payload.selfuid + '/friends/');
          friends.remove(payload.friendKey);
          let friendsOfFriends = this.db.list(payload.frienduid + '/friends/');
          friendsOfFriends.remove(payload.selfKey);
          return Observable.of({
              type: AppActions.SUCCESSFUL_POST,
              payload: null
          });
      });

  @Effect() storecredentials$ = this.action$
      .ofType(AppActions.STORE_CREDENTIALS)
      .map(toPayload)
      .switchMap(payload => {
          let user = this.db.object(payload.uid);
          user.update({ displayName: payload.displayName, photoURL: payload.photoURL, email: payload.email });
          return Observable.of({
            type: AppActions.LOGGED_IN,
            payload: payload
          });
      });

  constructor(private action$: Actions, private _http: Http, private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  pushFileToStorage(file: File, post: any): string {
    const storageRef = firebase.storage().ref();
    const uuid = generateUUID();
    const uploadTask = storageRef.child(uuid + '_'  + file.name).put(file);
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
