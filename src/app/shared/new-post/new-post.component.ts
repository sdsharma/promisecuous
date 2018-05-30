import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, UserState } from '../../store/state';
import { AppActions } from '../../store/actions/appActions';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  textActive: boolean = true;
  credentials: any = null;
  postText: string = '';
  postImage: string = null;
  postImageFile: ImageResult = null;
  options: ResizeOptions = {
    resizeMaxHeight: 500,
    resizeMaxWidth: 400
  };

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select((state: AppState) => {
        return state.user;
    }).subscribe((user: UserState) => {
      this.credentials = user.userData;
    });
  }

  createPost(): void {
    if (this.textActive) {
      this.store.dispatch({type: AppActions.NEW_PUBLIC_TEXT_POST, payload: {
        uid: this.credentials.uid,
        content: this.postText
      }});
      this.postText = '';
    } else if (this.postImage && this.postImageFile) {
      this.store.dispatch({type: AppActions.NEW_PUBLIC_PHOTO_POST, payload: {
        uid: this.credentials.uid,
        content: this.postImageFile
      }});
      this.postImage = null;
      this.postImageFile = null;
    }
  }

  selectedImage(imageResult: ImageResult): void {
    if (imageResult.error) {
      alert (imageResult.error);
    }
    this.postImage = imageResult.resized && imageResult.resized.dataURL || imageResult.dataURL;
    this.postImageFile = imageResult;
  }
}
