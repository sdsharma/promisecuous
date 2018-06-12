import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { AppActions } from '../../store/actions/appActions';

@Component({
  selector: 'user-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: any = {};
  @Input() userData: any;
  showCommentBox: boolean = false;
  comment: string = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { }

  postComment(): void {
    if ( !this.post.comments ) {
      this.post.comments = [];
    }
    if (this.comment !== '') {
      this.store.dispatch({type: AppActions.POST_COMMENT, payload: {comment: this.comment, post: this.post, userData: this.userData}});
    }
  }

  getCommentCount(): number {
    if (this.post.comments) {
      return this.post.comments.length;
    } else {
      return 0;
    }
  }

  like(): void {
    if ( !this.post.likes ) {
      this.post.likes = [];
    }
    this.store.dispatch({type: AppActions.LIKE_TIMELINE_POST, payload: {post: this.post, uid: this.userData.uid}});
  }

  liked(): boolean {
    if ( this.post.likes && this.post.likes.indexOf(this.userData.uid) > -1 ) {
      return true;
    } else {
      return false;
    }
  }

  getLikeCount(): number {
    if (this.post.likes) {
      return this.post.likes.length;
    } else {
      return 0;
    }
  }
}
