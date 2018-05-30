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
});
