/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { appReducers } from '../shared/functions/reducerTest';
import { SharedModule } from '../shared/shared.module';
import { AdsenseModule } from 'ng2-adsense';
import { ClarityModule } from 'clarity-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.provideStore(appReducers),
        RouterTestingModule,
        SharedModule.forRoot(),
        AdsenseModule.forRoot({
          adClient: 'ca-pub-7640562161899788',
          adSlot: 2930227358,
        }),
        ClarityModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
