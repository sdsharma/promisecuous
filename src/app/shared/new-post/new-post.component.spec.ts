/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, CUSTOM_ELEMENTS_SCHEMA, NgZone } from '@angular/core';
import { NewPostComponent } from './new-post.component';
import { appReducers } from '../functions/reducerTest';
import { StoreModule } from '@ngrx/store';
import { ClarityModule } from 'clarity-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadModule } from 'ng2-imageupload';

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore(appReducers),
        ClarityModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        ImageUploadModule
      ],
      declarations: [ NewPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing text posting mode', () => {
    component.textActive = true;
    component.postText = "should be cleared";
    component.postImage = "should stay";
    component.createPost();
    expect(component.postText).toEqual("");
    expect(component.postImage).toEqual("should stay");
  });

  it('testing photo posting mode', () => {
    component.textActive = false;
    component.postText = "should stay";
    component.postImage = "should be cleared";
    component.createPost();
    expect(component.postText).toEqual("should stay");
    expect(component.postImage).toEqual("should be cleared");
  });

  it('testing selectedImage', () => {
    let imgResult = {
      file: null,
      url: "url",
    };
    component.selectedImage(imgResult);
    expect(component.postImage).toEqual(undefined);
    expect(component.postImageFile).toEqual(imgResult);
  });
});
