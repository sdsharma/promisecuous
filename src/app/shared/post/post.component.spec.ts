/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PostComponent } from './post.component';
import { appReducers } from '../functions/reducerTest';
import { StoreModule } from '@ngrx/store';
import { ClarityModule } from 'clarity-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore(appReducers),
        ClarityModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ PostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets the comment count', () => {
    let count = component.getCommentCount();
    expect(count).toEqual(0);
  });

  it('gets the updated comment count', () => {
    component.post.comments = [];
    component.post.comments.push(0);
    let count = component.getCommentCount();
    expect(count).toEqual(1);
  });

  it('checks the liked status', () => {
    let liked = component.liked();
    expect(liked).toEqual(false);
  });

  it('checks the liked status based on the uid', () => {
    component.post.likes = [];
    component.post.likes.push('me');
    component.userData = {};
    component.userData.uid = 'me';
    let liked = component.liked();
    expect(liked).toEqual(true);
  });

  it('gets the like count', () => {
    let count = component.getLikeCount();
    expect(count).toEqual(0);
  });

  it('gets the updated like count', () => {
    component.post.likes = [];
    component.post.likes.push('me');
    let count = component.getLikeCount();
    expect(count).toEqual(1);
  });

});
