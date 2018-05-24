import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, ViewState } from '../../store/state';
import { AppActions } from '../../store/actions/appActions';
import { Router } from '@angular/router';

@Component({
    selector: 'post-response',
    templateUrl: './post-response.component.html',
    styleUrls: ['./post-response.component.scss']
  })

  export class PostResponseComponent{
    constructor(private store: Store<AppState>, private router: Router) { }

  }