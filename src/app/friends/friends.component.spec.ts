/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FriendsComponent } from './friends.component';
import { appReducers } from '../shared/functions/reducerTest';
import { SharedModule } from '../shared/shared.module';
import { ClarityModule } from 'clarity-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.provideStore(appReducers),
        RouterTestingModule,
        SharedModule.forRoot(),
        ClarityModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ],
      declarations: [ FriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if a friend is added', () => {
    let added = component.isAdded('hi');
    expect(added).toBeFalsy();
    component.userProfile = {
      friends: {
        first: {
          uid: 'hi'
        }
      }
    };
    added = component.isAdded('hi');
    expect(added).toBeTruthy();
  });
});
