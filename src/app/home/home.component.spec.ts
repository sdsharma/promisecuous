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
import { ClarityModule } from 'clarity-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { RouterModule, Routes} from '@angular/router';

describe('HomeComponent', () => {
  let component: any;
  let fixture: ComponentFixture<HomeComponent>;
  let debugEl: DebugElement;
  let router: Router;

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
      declarations: [ HomeComponent ]
    })
    .compileComponents();
   

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // spyOn(component.router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate', () => {
      //fixture = TestBed.createComponent(HomeComponent);
      spyOn(component.router, 'navigate');
      component.logout();  
      expect(component.router.navigate).toHaveBeenCalledWith(['login']);
  });

});
